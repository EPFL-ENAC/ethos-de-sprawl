<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">README</div>
    <q-markdown no-heading-anchor-links :src="content" />
  </q-page>
</template>

<script setup lang="ts">
const ReadmeMd = 'https://github.com/EPFL-ENAC/ethos-de-sprawl/raw/refs/heads/main/README.md';

const content = ref();

onMounted(async () => {
  const response = await fetch(ReadmeMd);
  content.value = await response.text();
});
</script>
