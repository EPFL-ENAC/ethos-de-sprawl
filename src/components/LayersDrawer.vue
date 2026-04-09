<template>
  <q-list>
    <q-item-label header class="text-h6">
      <q-icon name="layers" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('layers') }}</span>
    </q-item-label>
    <q-item v-for="layer in mapStore.layerSelections" :key="layer.id" class="q-pl-sm q-pr-sm">
      <q-item-section>
        <q-checkbox
          v-model="layer.visible"
          :label="$t(`layer.${layer.id}`)"
          @click="onToggleLayer(layer.id)"
        />
      </q-item-section>
      <q-item-section avatar>
        <q-btn flat round icon="help_outline" @click="helpStore.toggleHelp(layer.id)" />
      </q-item-section>
    </q-item>
    <q-item-label header>
      <span class="text-h6">
        <q-icon name="filter_alt" class="q-pb-xs" />
        <span class="q-ml-sm">{{ $t('filters') }}</span>
      </span>
      <q-btn
        flat
        no-caps
        color="primary"
        size="12px"
        icon="restart_alt"
        :label="$t('reset_filters')"
        @click="onResetFilters"
        class="q-mt-xs q-pl-xs q-pr-xs float-right"
      />
    </q-item-label>
    <q-item>
      <q-item-section>
        <span>{{ $t('total_score') }}</span>
        <q-range
          v-model="filtersStore.totalScore"
          :min="0"
          :max="100"
          :step="1"
          label
          snap
          color="primary"
          @change="onUpdatedFilter"
        />
        <span class="text-help">{{ $t('total_score_help') }}</span>
      </q-item-section>
    </q-item>
    <q-item-label header class="text-h6">
      <q-icon name="info" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('legends') }}</span>
    </q-item-label>
    <q-item-label>
      <span class="q-ml-md">{{ $t('total_score_legend') }}</span>
    </q-item-label>
    <q-item v-for="score in scoreColors" :key="score.color">
      <q-item-section avatar>
        <q-avatar :style="`background-color: ${score.color}`" text-color="black" />
      </q-item-section>
      <q-item-section>{{ $t(score.label) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayersDrawer',
});
</script>
<script setup lang="ts">
const mapStore = useMapStore();
const helpStore = useHelpStore();
const filtersStore = useFiltersStore();

const scoreColors = [
  {
    color: '#F28CB1',
    label: '100',
  },
  {
    color: '#3BB3C3',
    label: '50',
  },
  {
    color: '#2DC4B2',
    label: '0',
  },
];

function onToggleLayer(layerId: string) {
  mapStore.applyLayerVisibility(layerId);
  onUpdatedFilter();
}

function onResetFilters() {
  filtersStore.reset();
  onUpdatedFilter();
}

function onUpdatedFilter() {
  mapStore.applyFilters(filtersStore.asParams());
}
</script>
