import type { Map } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { mapsUrl } from '@/layers/commons';

export const SERVICE_YEARS = ['2045', '2100'];

export const SERVICE_COLORS: Record<string, string> = {
  grocery: '#2ca02c',
  school: '#1f77b4',
  healthcare: '#d62728',
  childcare: '#ff7f0e',
  elderly_care: '#9467bd',
  cultural_center: '#e377c2',
  admin: '#7f7f7f',
  sports_and_rec: '#bcbd22',
  repairs: '#8c564b',
  mobility: '#17becf',
};

export const SERVICES = Object.keys(SERVICE_COLORS);

/**
 * Add one hidden circle layer per service and year; tiles are only fetched once visible.
 * @param label translates a service id into a display label (used in popups)
 */
export function appendServices(map: Map, label: (service: string) => string) {
  for (const year of SERVICE_YEARS) {
    for (const service of SERVICES) {
      const id = `${service}_${year}`;
      map.addSource(id, { type: 'vector', url: `pmtiles://${mapsUrl}/services/${id}.pmtiles` });
      map.addLayer({
        id,
        type: 'circle',
        source: id,
        'source-layer': id,
        layout: { visibility: 'none' },
        paint: {
          'circle-color': SERVICE_COLORS[service] as string,
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 2, 14, 6],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 14, 1.5],
        },
      });
    }
  }
  // single handler for all service layers, so stacked points open only one popup
  const ids = SERVICE_YEARS.flatMap((year) => SERVICES.map((service) => `${service}_${year}`));
  map.on('click', ids, (e) => {
    const props = e.features?.[0]?.properties;
    if (!props) return;
    // a location offering several services is stacked in several layers: list them all
    const content = document.createElement('div');
    content.className = 'q-px-sm';
    const title = document.createElement('div');
    title.className = 'text-h6';
    title.textContent = props.name ? String(props.name) : '-';
    content.appendChild(title);
    const list = document.createElement('ul');
    list.className = 'q-pl-none q-my-sm';
    list.style.listStyle = 'none';
    for (const s of SERVICES.filter((s) => props[s] === 1)) {
      const item = document.createElement('li');
      item.innerHTML = `<span style="color: ${SERVICE_COLORS[s]}">●</span> `;
      item.append(label(s));
      list.appendChild(item);
    }
    content.appendChild(list);
    new Popup().setLngLat(e.lngLat).setDOMContent(content).addTo(map);
  });
}

/**
 * Show the selected services of the given year, hide all others.
 */
export function showServices(map: Map, year: string | undefined, selected: string[]) {
  for (const y of SERVICE_YEARS) {
    for (const service of SERVICES) {
      const visible = y === year && selected.includes(service);
      map.setLayoutProperty(`${service}_${y}`, 'visibility', visible ? 'visible' : 'none');
    }
  }
}
