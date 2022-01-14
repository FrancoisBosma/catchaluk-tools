<script setup lang="ts">
  import type { populationData } from '@API/local_placeholder'
  import { AGGLOMERATIONS, GENDERS } from '@API/local_placeholder'

  defineProps<{
    isCarouselMoving: Boolean
    populationName: String
    populationData: populationData
    generationTriggerCallback: Function
  }>()
</script>

<template>
  <div>
    <div>HEADER</div>
    <div>
      <div v-for="([critName, critValues], index) in Object.entries(populationData.criteria)" :key="index">
        <button
          v-for="(critValue, index2) in critValues"
          :key="index2"
          @click.stop="generationTriggerCallback(populationName, critName, critValue)"
        >
          {{ GENDERS[critValue] || AGGLOMERATIONS[critValue] }}
        </button>
      </div>
    </div>
  </div>
</template>
