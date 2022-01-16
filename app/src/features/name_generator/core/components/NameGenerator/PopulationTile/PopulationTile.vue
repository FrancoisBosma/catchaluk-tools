<script setup lang="ts">
  import TileHeader from './TileHeader'

  import type { PopulationData } from '@API/local_placeholder'
  import { AGGLOMERATIONS, GENDERS } from '@API/local_placeholder'

  import akoutlalPortrait from '@ASSETS/Akoutlal.jpg?url'
  import atlecPortrait from '@ASSETS/Atlec.jpg?url'
  import cutchakan_iktomiPortrait from '@ASSETS/Cutchakan&Iktomi.jpg?url'
  import oxotlliPortrait from '@ASSETS/Oxotlli.jpg?url'
  import tiguiPortrait from '@ASSETS/Tigui.jpg?url'
  import tucoyaPortrait from '@ASSETS/Tucoya.jpg?url'
  import zacoaltPortrait from '@ASSETS/Zacoalt.jpg?url'

  defineProps<{
    isCarouselMoving: boolean
    populationName: string
    populationData: PopulationData
    generationTriggerCallback: Function
  }>()

  const getBgImage = (popName: string) => {
    switch (popName) {
      case 'Akoutlal':
        return `url(${akoutlalPortrait})`
      case 'Atlec':
        return `url(${atlecPortrait})`
      case 'Cutchakan&Iktomi':
        return `url(${cutchakan_iktomiPortrait})`
      case 'Oxotlli':
        return `url(${oxotlliPortrait})`
      case 'Tigui':
        return `url(${tiguiPortrait})`
      case 'Tucoya':
        return `url(${tucoyaPortrait})`
      case 'Zacoalt':
        return `url(${zacoaltPortrait})`
      default:
        break
    }
  }
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
    :style="{ backgroundImage: getBgImage(populationName) }"
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
          class="btn font-sans"
          :style="{ cursor: isCarouselMoving ? 'inherit' : 'pointer' }"
          @click.stop="generationTriggerCallback(populationName, critName, critValue)"
        >
          {{ GENDERS[critValue] || AGGLOMERATIONS[critValue] }}
        </button>
      </div>
    </div>
  </div>
</template>
