<script setup lang="ts">
  import TileHeader from './TileHeader'

  import type { PopulationData } from '@API/local_placeholder'
  import { AGGLOMERATIONS, GENDERS } from '@API/local_placeholder'

  defineProps<{
    isCarouselMoving: boolean
    populationName: string
    populationData: PopulationData
    generationTriggerCallback: Function
  }>()
</script>

<template>
  <div
    w:h="[386px] sm:([180px])"
    w:w="[180px] sm:([386px])"
    w:border="3 solid [var(--background)] rounded-[10px]"
    class="flex flex-col"
    w:justify="end"
    w:m="x-8"
    w:p="4 t-0"
  >
    <TileHeader
      :population-name="populationName"
      :redirection-links="populationData.redirectionLinks"
      :is-carousel-moving="isCarouselMoving"
    />
    <div class="grid" w:gap="y-[10px]">
      <div
        v-for="([critName, critValues], index) in Object.entries(populationData.criteria)"
        :key="index"
        class="flex wrap"
        w:gap="[5px]"
        w:justify="center"
      >
        <button
          v-for="(critValue, index2) in critValues"
          :key="index2"
          class="btn"
          :style="{ cursor: isCarouselMoving ? 'inherit' : 'pointer' }"
          @click.stop="generationTriggerCallback(populationName, critName, critValue)"
        >
          {{ GENDERS[critValue] || AGGLOMERATIONS[critValue] }}
        </button>
      </div>
    </div>
  </div>
</template>
