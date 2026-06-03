<template>
  <q-list>
    <q-item-label header class="text-h6">
      <q-icon name="layers" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('layers') }}</span>
    </q-item-label>
    <template v-for="layer in mapStore.layerSelections" :key="layer.id">
      <q-item class="q-pl-sm q-pr-sm">
        <q-item-section>
          <q-radio
            v-model="currentLayer"
            :val="layer.id"
            :label="$t(`layer.${layer.id}`)"
            @click="onToggleLayer(layer.id)"
          />
        </q-item-section>
        <q-item-section avatar>
          <q-btn flat round icon="help_outline" @click="helpStore.toggleHelp(layer.id)" />
        </q-item-section>
      </q-item>
    </template>
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
    <q-item v-for="[label, color] in Object.entries(COLOR_SCALE)" :key="color">
      <q-item-section avatar>
        <q-avatar size="sm" :style="`background-color: ${color}`" text-color="black" />
      </q-item-section>
      <q-item-section>{{ $t(label) }}</q-item-section>
    </q-item>
    <q-item>
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
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { COLOR_SCALE } from 'src/utils/constants';

const mapStore = useMapStore();
const helpStore = useHelpStore();
const filtersStore = useFiltersStore();

const currentLayer = ref<string | null>(DEFAULT_LAYER);

function onToggleLayer(layerId: string) {
  mapStore.setVisibleLayer(layerId);
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
