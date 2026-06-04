import type { Map } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { LayerManager } from 'src/layers/models';
import type { FilterParams } from 'src/stores/filters';
import { getColorScalePaint } from 'src/utils/constants';

const cdnUrl = 'https://enacit4r-cdn.epfl.ch';
const mapsUrl = `${cdnUrl}/ehtos-de-sprawl/2026-06-03T17:20/data`;

export class DeSprawlLayerManager extends LayerManager<FilterParams> {
  getId(): string {
    return 'desprawl';
  }

  getPMTilesBasename(): string {
    return 'de-sprawl';
  }

  fmt(v: number | null | undefined) {
    return v != null ? Number(v).toFixed(2) : '-';
  }

  getFeaturePropertiesKeysMap() {
    return {
      name: 'name',
      population: 'population',
      mobility: 'mobility',
      health_care: 'healthcare',
      school: 'school',
      childcare: 'childcare',
      elderly_care: 'elderly_care',
      cultural_center: 'cultural_center',
      nutrition: 'grocery',
      sports_and_rec: 'sports_and_rec',
      public_admin: 'admin',
      repair: 'repair',
      total: 'total',
    };
  }

  getFeaturePropertiesMap(feature: {
    properties: Record<string, unknown>;
  }): Record<string, string | undefined> {
    const properties = feature.properties;
    const keys = this.getFeaturePropertiesKeysMap();
    return {
      name: properties[keys.name] ? String(properties[keys.name]) : undefined,
      population: properties[keys.population] ? String(properties[keys.population]) : undefined,
      score_grocery: properties[keys.nutrition]
        ? this.fmt(properties[keys.nutrition] as number | null | undefined)
        : undefined,
      score_school: properties[keys.school]
        ? this.fmt(properties[keys.school] as number | null | undefined)
        : undefined,
      score_healthcare: properties[keys.health_care]
        ? this.fmt(properties[keys.health_care] as number | null | undefined)
        : undefined,
      score_sports_and_rec: properties[keys.sports_and_rec]
        ? this.fmt(properties[keys.sports_and_rec] as number | null | undefined)
        : undefined,
      score_cultural_center: properties[keys.cultural_center]
        ? this.fmt(properties[keys.cultural_center] as number | null | undefined)
        : undefined,
      score_admin: properties[keys.public_admin]
        ? this.fmt(properties[keys.public_admin] as number | null | undefined)
        : undefined,
      score_childcare: properties[keys.childcare]
        ? this.fmt(properties[keys.childcare] as number | null | undefined)
        : undefined,
      score_repairs: properties[keys.repair]
        ? this.fmt(properties[keys.repair] as number | null | undefined)
        : undefined,
      score_elderly_care: properties[keys.elderly_care]
        ? this.fmt(properties[keys.elderly_care] as number | null | undefined)
        : undefined,
      score_mobility: properties[keys.mobility]
        ? this.fmt(properties[keys.mobility] as number | null | undefined)
        : undefined,
      total_score: properties[keys.total]
        ? this.fmt(properties[keys.total] as number | null | undefined)
        : undefined,
    };
  }

  append(map: Map): void {
    const layerId = this.getId();
    const pmTilesUrl = `pmtiles://${mapsUrl}/${this.getPMTilesBasename()}.pmtiles`;
    const keys = this.getFeaturePropertiesKeysMap();
    const totalScoreKey = keys.total;

    map.addSource(layerId, {
      type: 'vector',
      url: pmTilesUrl,
    });

    map.addLayer({
      id: layerId,
      type: 'fill',
      source: layerId,
      'source-layer': layerId,
      layout: {
        visibility: 'none',
      },
      paint: getColorScalePaint(totalScoreKey),
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', layerId, (e) => {
      const feature = e.features ? e.features[0] : null;
      if (!feature) return;
      const coordinates = e.lngLat;
      const propertiesMap = this.getFeaturePropertiesMap(feature);
      const popupContent = document.createElement('div');
      popupContent.className = 'q-px-sm';

      if (propertiesMap.name) {
        const title = document.createElement('div');
        title.className = 'text-h6';
        title.textContent = propertiesMap.name;
        popupContent.appendChild(title);
      }

      const population = document.createElement('p');
      population.className = 'text-body2 q-mt-sm q-mb-none';
      population.innerHTML = `Population: <b>${propertiesMap.population || '-'}</b>`;
      popupContent.appendChild(population);

      const separator = document.createElement('hr');
      popupContent.appendChild(separator);

      const totalScore = document.createElement('p');
      totalScore.className = 'text-body2 q-mt-none q-mb-sm';
      totalScore.innerHTML = `Total Score: <b>${propertiesMap.total_score}</b>`;
      popupContent.appendChild(totalScore);

      const table = document.createElement('table');
      const rows = [
        ['Grocery', propertiesMap.score_grocery],
        ['School', propertiesMap.score_school],
        ['Healthcare', propertiesMap.score_healthcare],
        ['Sports and Recreation', propertiesMap.score_sports_and_rec],
        ['Cultural Center', propertiesMap.score_cultural_center],
        ['Admin', propertiesMap.score_admin],
        ['Childcare', propertiesMap.score_childcare],
        ['Repairs', propertiesMap.score_repairs],
        ['Elderly Care', propertiesMap.score_elderly_care],
        ['Mobililty', propertiesMap.score_mobility],
      ];

      for (const [label, value] of rows) {
        const row = document.createElement('tr');

        const header = document.createElement('th');
        header.setAttribute('align', 'right');
        header.textContent = label || '-';

        const cell = document.createElement('td');
        cell.textContent = value || '-';

        row.appendChild(header);
        row.appendChild(cell);
        table.appendChild(row);
      }

      popupContent.appendChild(table);

      new Popup().setLngLat(coordinates).setDOMContent(popupContent).addTo(map);
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    map.setLayoutProperty(this.getId(), 'visibility', visibility);
  }

  filter(map: Map, filters: FilterParams): void {
    const keys = this.getFeaturePropertiesKeysMap();
    const totalScoreKey = keys.total;
    map.setFilter(this.getId(), [
      'all',
      ['>=', ['get', totalScoreKey], filters.totalScore[0]],
      ['<=', ['get', totalScoreKey], filters.totalScore[1]],
      ['>=', ['get', keys.nutrition], filters.groceryScore[0]],
      ['<=', ['get', keys.nutrition], filters.groceryScore[1]],
      ['>=', ['get', keys.health_care], filters.healthCareScore[0]],
      ['<=', ['get', keys.health_care], filters.healthCareScore[1]],
      ['>=', ['get', keys.school], filters.schoolScore[0]],
      ['<=', ['get', keys.school], filters.schoolScore[1]],
      ['>=', ['get', keys.childcare], filters.childcareScore[0]],
      ['<=', ['get', keys.childcare], filters.childcareScore[1]],
      ['>=', ['get', keys.elderly_care], filters.elderlyCareScore[0]],
      ['<=', ['get', keys.elderly_care], filters.elderlyCareScore[1]],
      ['>=', ['get', keys.cultural_center], filters.culturalCenterScore[0]],
      ['<=', ['get', keys.cultural_center], filters.culturalCenterScore[1]],
      ['>=', ['get', keys.nutrition], filters.groceryScore[0]],
      ['<=', ['get', keys.nutrition], filters.groceryScore[1]],
      ['>=', ['get', keys.sports_and_rec], filters.sportsAndRecScore[0]],
      ['<=', ['get', keys.sports_and_rec], filters.sportsAndRecScore[1]],
      ['>=', ['get', keys.public_admin], filters.publicAdminScore[0]],
      ['<=', ['get', keys.public_admin], filters.publicAdminScore[1]],
      ['>=', ['get', keys.repair], filters.repairScore[0]],
      ['<=', ['get', keys.repair], filters.repairScore[1]],
      ['>=', ['get', keys.mobility], filters.mobilityScore[0]],
      ['<=', ['get', keys.mobility], filters.mobilityScore[1]],
    ]);
  }
}
