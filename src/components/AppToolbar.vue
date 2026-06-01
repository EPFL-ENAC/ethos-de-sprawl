<template>
  <q-toolbar>
    <q-btn
      v-if="$q.screen.lt.md && !noMenu"
      flat
      dense
      round
      icon="menu"
      class="on-left"
      @click="toggleLeftDrawer"
    />
    <a href="https://epfl.ch" target="_blank" class="q-mt-sm">
      <img src="EPFL_logo.png" :style="$q.screen.lt.md ? 'height: 15px' : 'height: 20px'" />
    </a>
    <span class="q-ml-md" :class="$q.screen.lt.md ? 'text-bold' : 'text-h6'">{{
      $t('app_title')
    }}</span>
    <q-space />
    <span v-if="!$q.screen.lt.md">
      <q-btn
        flat
        round
        icon="menu_book"
        :title="$t('resources')"
        @click="showResources = true"
      ></q-btn>
      <q-btn
        flat
        round
        icon="info"
        :title="$t('introduction')"
        @click="showIntro = true"
        class="on-left"
      ></q-btn>
    </span>
    <q-btn v-if="$q.screen.lt.md" flat round icon="more_vert">
      <q-popup-proxy>
        <q-list class="bg-white">
          <q-separator v-if="$q.screen.lt.sm" />
          <q-item clickable v-close-popup @click="showResources = true">
            <q-item-section>
              <q-item-label>{{ $t('resources') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="showIntro = true">
            <q-item-section>
              <q-item-label>{{ $t('introduction') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-popup-proxy>
    </q-btn>
    <template v-if="!$q.screen.lt.md">
      <a href="https://www.epfl.ch/labs/ethos/" target="_blank" class="text-h5 epfl"> ETHOS </a>
      <a href="https://www.epfl.ch/labs/leure/" target="_blank" class="text-h5 epfl on-right">
        LEURE
      </a>
    </template>
    <a href="https://sweet-swice.ch/" target="_blank" class="text-h5 epfl on-right"
      ><img src="Sweet-SWICE.jpg" style="height: 25px"
    /></a>
  </q-toolbar>

  <simple-dialog v-model="showIntro" :content="IntroductionEnMd" />

  <simple-dialog v-model="showResources" :title="$t('resources')">
    <q-list separator>
      <essential-link v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-list>
  </simple-dialog>
</template>

<script lang="ts">
export default defineComponent({
  components: { SimpleDialog },
  name: 'AppToolbar',
});
</script>
<script setup lang="ts">
import IntroductionEnMd from 'src/assets/introduction-en.md';
import essentialLinks from 'src/assets/links.json';
import EssentialLink from 'src/components/EssentialLink.vue';
import SimpleDialog from 'src/components/SimpleDialog.vue';
import { type Settings } from 'src/stores/settings';

interface Props {
  noMenu?: boolean;
}

withDefaults(defineProps<Props>(), {
  noMenu: false,
});
const emit = defineEmits(['toggle']);

const settingsStore = useSettingsStore();

const showIntro = ref(false);
const showResources = ref(false);

onMounted(() => {
  if (!settingsStore.settings?.intro_shown) {
    showIntro.value = true;
    settingsStore.saveSettings({ intro_shown: true } as Settings);
  }
});

function toggleLeftDrawer() {
  emit('toggle');
}
</script>
