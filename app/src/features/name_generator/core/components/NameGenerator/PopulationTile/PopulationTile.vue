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
  <div
    w:h="[386px] sm:([180px])"
    w:w="[180px] sm:([386px])"
    w:border="3 solid [var(--background)] rounded-[10px]"
    class="flex flex-col"
    w:justify="evenly sm:(between)"
    w:m="x-8"
    w:p="4"
  >
    <div>HEADER</div>
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
