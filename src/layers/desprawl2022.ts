import type { Map } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { LayerManager } from 'src/layers/models';
import type { FilterParams } from 'src/stores/filters';

const cdnUrl = 'https://enacit4r-cdn.epfl.ch';
const mapsUrl = `${cdnUrl}/ehtos-de-sprawl/2026-04-08T08:49/data`;

const PMTILES_2022_URL = `${mapsUrl}/de-sprawl-2022.pmtiles`;

export class DeSprawl2022LayerManager extends LayerManager<FilterParams> {
  getId(): string {
    return 'desprawl2022';
  }

  append(map: Map): void {
    map.addSource('desprawl2022', {
      type: 'vector',
      url: `pmtiles://${PMTILES_2022_URL}`,
    });

    map.addLayer({
      id: 'desprawl2022',
      type: 'fill',
      source: 'desprawl2022',
      'source-layer': 'desprawl2022',
      layout: {
        visibility: 'none',
      },
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'population'],
          0,
          '#FFFFFF',
          500,
          '#000000',
        ],
        'fill-opacity': 0.8,
      },
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'desprawl2022', (e) => {
      const feature = e.features ? e.features[0] : null;
      if (!feature) return;
      const coordinates = e.lngLat;
      const population = feature.properties?.population;
      new Popup().setLngLat(coordinates).setHTML(`Population: ${population}`).addTo(map);
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['desprawl2022'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }

  filter(map: Map, filters: FilterParams): void {
    map.setFilter('desprawl2022', [
      'all',
      ['>=', ['get', 'population'], filters.population[0]],
      ['<=', ['get', 'population'], filters.population[1]],
    ]);
  }
}
