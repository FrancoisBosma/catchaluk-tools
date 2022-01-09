<script setup lang="ts">
  import Flicking from '@egjs/vue3-flicking'
  import { Fade, Pagination } from '@egjs/flicking-plugins'
  const flickingOptions = {
    align: 'center',
    circular: true,
    deceleration: 0.01,
    easing: (x: number) => 1 - (1 - x) ** 3,
    noPanelStyleOverride: true,
  }
  const flickingPlugins = [new Fade(), new Pagination({ type: 'bullet' })]
</script>

<template>
  <h2 w:m="b-8">Générateur de noms</h2>
  <h3 w:m="b-4">Générez aléatoirement 5 noms de personnages ou d'agglomérations</h3>
  <p>Choisissez un peuple, puis cliquez sur le type de nom à générer</p>
  <div>
    <Flicking :options="flickingOptions" :plugins="flickingPlugins">
      <p></p>
    </Flicking>
  </div>
</template>
