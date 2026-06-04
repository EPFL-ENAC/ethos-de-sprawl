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
    <q-item-label header class="text-h6">
      <q-icon name="filter_list" class="q-pb-xs" />
      <span class="q-ml-sm">{{ $t('filters') }}</span>
      <q-btn
        flat
        no-caps
        color="primary"
        size="10px"
        icon="restart_alt"
        :label="$t('reset_filters')"
        @click="onResetFilters"
        class="q-pl-xs q-pr-xs float-right"
      />
    </q-item-label>
    <q-item>
      <q-item-section>
        <div class="text-bold">{{ $t('total_score') }}</div>
        <div class="text-caption">{{ $t('total_score_legend') }}</div>
        <div class="row q-mt-sm">
          <template v-for="[label, color] in Object.entries(COLOR_SCALE)" :key="color">
            <div
              class="col"
              :style="`background-color: ${color}; width: 100%; height: 20px;`"
              :title="$t(label)"
            ></div>
          </template>
        </div>
        <q-range
          v-model="filtersStore.totalScore"
          :min="0"
          :max="100"
          :step="1"
          label-always
          snap
          color="primary"
          @change="onUpdatedFilter"
          style="margin-top: -12px"
        />
        <div class="text-help">{{ $t('total_score_help') }}</div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <div class="text-bold">{{ $t('score_breakdown') }}</div>
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('grocery_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('grocery_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.groceryScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('school_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('school_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.schoolScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('health_care_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('health_care_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.healthCareScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('childcare_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('childcare_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.childcareScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('elderly_care_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('elderly_care_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.elderlyCareScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('cultural_center_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('cultural_center_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.culturalCenterScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('public_admin_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('public_admin_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.publicAdminScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('sports_and_rec_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('sports_and_rec_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.sportsAndRecScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('repair_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('repair_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.repairScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
    </q-item>
    <q-item class="q-py-none">
      <q-item-section>
        <div class="row items-center">
          <div class="text-caption">{{ $t('mobility_score') }}</div>
          <q-btn flat round size="sm" icon="help_outline">
            <q-tooltip>{{ $t('mobility_score_legend') }}</q-tooltip>
          </q-btn>
        </div>
        <q-range
          v-model="filtersStore.mobilityScore"
          :min="0"
          :max="10"
          :step="1"
          label
          snap
          color="secondary"
          @change="onUpdatedFilter"
        />
      </q-item-section>
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
