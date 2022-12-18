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
      case 'Atlec&Aweche':
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
    w:w="180px sm:386px"
    w:h="386px sm:180px"
    w:border="3 solid [var(--foreground)] rounded-[10px]"
    w:justify="start"
    w:m="x-8"
    w:p="4 t-0"
    w:flex="~ col"
    w:position="relative"
    class="population-tile"
  >
    <div
      w:z="-1"
      w:position="absolute"
      w:left="-103px sm:-1px"
      w:top="102px sm:-1px"
      w:rounded="8px"
      w:bg="cover"
      w:w="380px sm:[calc(100%+1px)]"
      w:h="175px sm:[calc(100%+1px)]"
      class="<sm:(transform rotate-90)"
      :style="{ backgroundImage: getBgImage(populationName) }"
    />
    <TileHeader
      :population-name="populationName"
      :redirection-links="populationData.redirectionLinks"
      :is-carousel-moving="isCarouselMoving"
    />
    <div class="grid" w:gap="y-[10px]">
      <div
        v-for="([critName, critValues], index) in Object.entries(populationData.criteria)"
        :key="index"
        class="flex flex-wrap"
        w:gap="[5px]"
        w:justify="center"
        w:align="items-center"
      >
        <button
          v-for="(critValue, index2) in critValues"
          :key="index2"
          class="btn hover:(text-[120%] border-2)"
          :style="{ cursor: isCarouselMoving ? 'inherit' : 'pointer' }"
          @click.stop="generationTriggerCallback(populationName, critName, critValue)"
        >
          {{ GENDERS[critValue] || AGGLOMERATIONS[critValue] }}
        </button>
      </div>
    </div>
  </div>
</template>
