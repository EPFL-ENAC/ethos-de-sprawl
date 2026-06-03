import type { Map } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { LayerManager } from 'src/layers/models';
import type { FilterParams } from 'src/stores/filters';
import { getColorScalePaint } from 'src/utils/constants';

const cdnUrl = 'https://enacit4r-cdn.epfl.ch';
const mapsUrl = `${cdnUrl}/ehtos-de-sprawl/2026-06-03T15:55/data`;

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
  }): Record<string, string> {
    const properties = feature.properties;
    const keys = this.getFeaturePropertiesKeysMap();
    return {
      name: String(properties[keys.name]),
      population: String(properties[keys.population]),
      score_grocery: this.fmt(properties[keys.nutrition] as number | null | undefined),
      score_school: this.fmt(properties[keys.school] as number | null | undefined),
      score_healthcare: this.fmt(properties[keys.health_care] as number | null | undefined),
      score_sports_and_rec: this.fmt(properties[keys.sports_and_rec] as number | null | undefined),
      score_cultural_center: this.fmt(
        properties[keys.cultural_center] as number | null | undefined,
      ),
      score_admin: this.fmt(properties[keys.public_admin] as number | null | undefined),
      score_childcare: this.fmt(properties[keys.childcare] as number | null | undefined),
      score_repairs: this.fmt(properties[keys.repair] as number | null | undefined),
      score_elderly_care: this.fmt(properties[keys.elderly_care] as number | null | undefined),
      score_mobility: this.fmt(properties[keys.mobility] as number | null | undefined),
      total_score: this.fmt(properties[keys.total] as number | null | undefined),
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
      /*
        Id : identifiant unique de l'hectare
        Max_pop : la population maximum qui peut vivre dans un hectare
        Name : nom de la commune de l'hectare
        Max_reachable_population : la population totale dans un rayon de 500m de l'hectare en question
        Grocery/school/healthcare/sports_and_rec/cultural_center/admin/childcare/repairs/elderly_care/mobility : 0 ou 1, indiquant si ce service se trouve dans l'hectare en question
        Dist_to_[Grocery/school/healthcare/sports_and_rec/cultural_center/admin/childcare/repairs/elderly_care/mobility] : distance entre l'hectare en question et le service le plus proche
        Score_[Grocery/school/healthcare/sports_and_rec/cultural_center/admin/childcare/repairs/elderly_care/mobility] : score d'accessibilité de l'hectare en question par rapport au service
        Total_score/accessibility_score_total : score total de l'accessibilité pour l'hectare en question (celui affiché sur la carte à l'aide de couleurs)
      */
      const propertiesMap = this.getFeaturePropertiesMap(feature);
      // make a html string with the properties of interest
      const htmlContent = `
      <div class="q-px-sm">
        <div class="text-h6">${propertiesMap.name}</div>

        <p class="text-body2 q-mt-sm q-mb-none">Population: <b>${propertiesMap.population || '-'}</b></p>
        <hr/>
        <p class="text-body2 q-mt-none q-mb-sm">Total Score: <b>${propertiesMap.total_score}</b></p>
        <table>
          <tr>
            <th align="right">Grocery</th>
            <td>${propertiesMap.score_grocery}</td>
          </tr>
          <tr>
            <th align="right">School</th>
            <td>${propertiesMap.score_school}</td>
          </tr>
          <tr>
            <th align="right">Healthcare</th>
            <td>${propertiesMap.score_healthcare}</td>
          </tr>
          <tr>
            <th align="right">Sports and Recreation</th>
            <td>${propertiesMap.score_sports_and_rec}</td>
          </tr>
          <tr>
            <th align="right">Cultural Center</th>
            <td>${propertiesMap.score_cultural_center}</td>
          </tr>
          <tr>
            <th align="right">Admin</th>
            <td>${propertiesMap.score_admin}</td>
          </tr>
          <tr>
            <th align="right">Childcare</th>
            <td>${propertiesMap.score_childcare}</td>
          </tr>
          <tr>
            <th align="right">Repairs</th>
            <td>${propertiesMap.score_repairs}</td>
          </tr>
          <tr>
            <th align="right">Elderly Care</th>
            <td>${propertiesMap.score_elderly_care}</td>
          </tr>
          <tr>
            <th align="right">Mobililty</th>
            <td>${propertiesMap.score_mobility}</td>
          </tr>
        </table>
      </div>
      `;
      new Popup().setLngLat(coordinates).setHTML(htmlContent).addTo(map);
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
    ]);
  }
}
