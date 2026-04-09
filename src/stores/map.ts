import { defineStore } from 'pinia';
import { DeSprawl2100LayerManager } from 'src/layers/desprawl2100';
import { DeSprawl2022LayerManager } from 'src/layers/desprawl2022';
import { type Map } from 'maplibre-gl';
import { type FilterParams } from 'src/stores/filters';

export type LayerSelection = {
  id: string;
  visible: boolean;
};

export const useMapStore = defineStore('map', () => {
  const map = ref<Map>();

  const layerManagers = [new DeSprawl2022LayerManager(), new DeSprawl2100LayerManager()];

  const layerSelections: LayerSelection[] = layerManagers.map((lm) => ({
    id: lm.getId(),
    visible: lm.getId() === 'desprawl2100', // only the 2100 layer is visible by default
  }));

  /**
   * Find a layer selection state by its identifier.
   * @param id the layer selection state
   * @returns
   */
  function findLayer(id: string) {
    return layerSelections.find((l) => l.id === id);
  }

  /**
   * Toggle the visibility of a layer.
   * @param id the layer identifier
   */
  function applyLayerVisibility(id: string) {
    if (!map.value) return;
    const manager = getLayerManager(id);
    const layer = findLayer(id);
    if (manager && layer) {
      manager.setVisible(map.value, layer.visible);
    }
  }

  /**
   * Apply the data filters to the layers.
   * @param filters the data filters parameters
   */
  function applyFilters(filters: FilterParams) {
    if (!map.value) return;
    layerSelections.map((layer) => {
      if (map.value && layer.visible) {
        const manager = getLayerManager(layer.id);
        if (manager) {
          manager.filter(map.value, filters);
        }
      }
    });
  }

  /**
   * Register the current map and initialize the layers for that map.
   * @param mapInstance the map instance
   * @returns
   */
  function initLayers(mapInstance: Map) {
    map.value = mapInstance;
    layerSelections.map((layer) => {
      const manager = getLayerManager(layer.id);
      if (!manager) return;
      manager.append(mapInstance);
    });
  }

  /**
   * Get the layer manager by its identifier.
   * @param id the layer identifier
   * @returns
   */
  function getLayerManager(id: string) {
    return layerManagers.find((lm) => lm.getId() === id);
  }

  return {
    map,
    layerSelections,
    applyFilters,
    applyLayerVisibility,
    initLayers,
  };
});
