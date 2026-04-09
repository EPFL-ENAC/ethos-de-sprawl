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
      const total_score = feature.properties?.total_score;
      new Popup().setLngLat(coordinates).setHTML(`Total Score: ${total_score}`).addTo(map);
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
