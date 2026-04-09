import type { Map } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { LayerManager } from 'src/layers/models';
import type { FilterParams } from 'src/stores/filters';

const cdnUrl = 'https://enacit4r-cdn.epfl.ch';
const mapsUrl = `${cdnUrl}/ehtos-de-sprawl/2026-04-08T08:49/data`;

const PMTILES_2100_URL = `${mapsUrl}/de-sprawl-2100.pmtiles`;

export class DeSprawl2100LayerManager extends LayerManager<FilterParams> {
  getId(): string {
    return 'desprawl2100';
  }

  append(map: Map): void {
    map.addSource('desprawl2100', {
      type: 'vector',
      url: `pmtiles://${PMTILES_2100_URL}`,
    });

    map.addLayer({
      id: 'desprawl2100',
      type: 'fill',
      source: 'desprawl2100',
      'source-layer': 'desprawl2100',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'total_score'],
          0,
          '#2DC4B2',
          50,
          '#3BB3C3',
          100,
          '#F28CB1',
        ],
        'fill-opacity': 0.8,
      },
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'desprawl2100', (e) => {
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
      const properties = feature.properties;
      // iterate over properties of interest and display them in the popup
      const max_pop = properties?.max_pop;
      const name = properties?.name;
      const max_reachable_population = properties?.max_reachable_population;
      const score_grocery = properties?.score_grocery;
      const score_school = properties?.score_school;
      const score_healthcare = properties?.score_healthcare;
      const score_sports_and_rec = properties?.score_sports_and_rec;
      const score_cultural_center = properties?.score_cultural_center;
      const score_admin = properties?.score_admin;
      const score_childcare = properties?.score_childcare;
      const score_repairs = properties?.score_repairs;
      const score_elderly_care = properties?.score_elderly_care;
      const score_mobility = properties?.score_mobility;
      const total_score = properties?.total_score;
      // make a html string with the properties of interest
      const fmt = (v: number | null | undefined) => (v != null ? Number(v).toFixed(2) : '-');
      const htmlContent = `
      <div class="q-px-sm">
        <div class="text-h6">${name}</div>
        <p>Total Score: ${fmt(total_score)}</p>
        <table>
          <tr>
            <th align="right">Max Population</th>
            <td>${max_pop || '-'}</td>
          </tr>
          <tr>
            <th align="right">Max Reachable Population</th>
            <td>${max_reachable_population || '-'}</td>
          </tr>
          <tr>
            <th align="right">Grocery</th>
            <td>${fmt(score_grocery)}</td>
          </tr>
          <tr>
            <th align="right">School</th>
            <td>${fmt(score_school)}</td>
          </tr>
          <tr>
            <th align="right">Healthcare</th>
            <td>${fmt(score_healthcare)}</td>
          </tr>
          <tr>
            <th align="right">Sports and Recreation</th>
            <td>${fmt(score_sports_and_rec)}</td>
          </tr>
          <tr>
            <th align="right">Cultural Center</th>
            <td>${fmt(score_cultural_center)}</td>
          </tr>
          <tr>
            <th align="right">Admin</th>
            <td>${fmt(score_admin)}</td>
          </tr>
          <tr>
            <th align="right">Childcare</th>
            <td>${fmt(score_childcare)}</td>
          </tr>
          <tr>
            <th align="right">Repairs</th>
            <td>${fmt(score_repairs)}</td>
          </tr>
          <tr>
            <th align="right">Elderly Care</th>
            <td>${fmt(score_elderly_care)}</td>
          </tr>
          <tr>
            <th align="right">Mobililty</th>
            <td>${fmt(score_mobility)}</td>
          </tr>
        </table>
      </div>
      `;
      new Popup().setLngLat(coordinates).setHTML(htmlContent).addTo(map);
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['desprawl2100'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }

  filter(map: Map, filters: FilterParams): void {
    map.setFilter('desprawl2100', [
      'all',
      ['>=', ['get', 'total_score'], filters.totalScore[0]],
      ['<=', ['get', 'total_score'], filters.totalScore[1]],
    ]);
  }
}
