<script setup lang="ts">
  import Flicking from '@egjs/vue3-flicking'
  import { Fade, Pagination } from '@egjs/flicking-plugins'
  import { UseMousePressed } from '@vueuse/components'

  import PopulationTile from './PopulationTile'

  import findAllIndexes from '@GLOBAL/functions/strings'
  import { range } from '@GLOBAL/functions/numbers'
  import type { Dictionary } from '@ROOT/src/types'

  import { EMPTY_CHAR, /* GENDERS, */ PopulationBase } from '@API/local_placeholder'

  // non-reactive data
  const flickingOptions = {
    align: 'center',
    circular: true,
    deceleration: 0.01,
    easing: (x: number) => 1 - (1 - x) ** 3,
    noPanelStyleOverride: true,
  }
  const flickingPlugins = [new Fade(), new Pagination({ type: 'bullet' })]
  // reactive data & computed
  const isCarouselMoving = ref(false)
  const selectedCriterium = ref({ populationName: '', critName: '', critValue: '' })
  const selectedNameBase = computed(() => {
    const output: Dictionary<Array<string>> = {}
    if (!selectedCriterium.value.populationName) return output
    PopulationBase[selectedCriterium.value.populationName].names.forEach((nameData) => {
      if (!Object.prototype.hasOwnProperty.call(output, nameData.gender)) output[nameData.gender] = []
      output[nameData.gender].push(nameData.name)
    })
    return output
  })
  // methods
  const doesNameRespectNomenclature = (name: string): boolean => {
    const { nomenclature } = PopulationBase[selectedCriterium.value.populationName]
    const { min: minSize, max: maxSize } = nomenclature.nameSize
    if (!(name.length >= minSize && name.length <= maxSize)) {
      return false
    }
    const areSpecialCharsRulesRespected = Object.entries(nomenclature.specialChars).every(([spChar, rules]) => {
      const spCharOccurrences = findAllIndexes(name, spChar)
      const spCharAmount =
        spCharOccurrences.length -
        spCharOccurrences.reduce((acc: number, curr: number) => acc + Number(rules.isException(name, curr)), 0)
      if (spCharAmount > rules.maxAllowed) return false
      const spCharsAreIllPlaced = spCharOccurrences.some(
        (index: number) => index < rules.minDistFromEdges - 1 || index > name.length - rules.minDistFromEdges
      )
      if (spCharsAreIllPlaced) return false
      return true
    })
    if (!areSpecialCharsRulesRespected) return false
    return true
  }
  const generateCharOccurrenceTable = (nameList: string[]): Dictionary<Dictionary<number>> => {
    const output: Dictionary<Dictionary<number>> = {}
    nameList.forEach((name) => {
      range(name.length, -1).forEach((index) => {
        const currChar = name[index] ?? EMPTY_CHAR
        const prevChar = name[index - 1] ?? EMPTY_CHAR
        const nextChar = name[index + 1] ?? EMPTY_CHAR
        const prevTwoChars = [prevChar, currChar].toString()
        if (!Object.prototype.hasOwnProperty.call(output, prevTwoChars)) {
          output[prevTwoChars] = {}
        }
        const nextCharTable = output[prevTwoChars]
        const nextCharCurrentCount = nextCharTable[nextChar] ?? 0
        nextCharTable[nextChar] = nextCharCurrentCount + 1
      })
    })
    return output
  }
  const getRandomNamesFromCharOccurrences = (
    occurrenceTable: Dictionary<Dictionary<number>>,
    nbWanted: number
  ): string[] => {
    const output: string[] = []
    if (!Object.keys(occurrenceTable).length) return output
    const generateNewName = (occTable: Dictionary<Dictionary<number>>, legacyGeneratedNames: string[]): string => {
      let outputName = EMPTY_CHAR
      let charToAdd = EMPTY_CHAR
      let generationWasReset = false
      do {
        generationWasReset = false
        const prevPrevChar = outputName.slice(-2, -1) ?? EMPTY_CHAR
        const prevChar = outputName.slice(-1) ?? EMPTY_CHAR
        const nextCharTable: Dictionary<number> = occTable[[prevPrevChar, prevChar].toString()]
        const nbOfNextCharOccurrences = Object.values(nextCharTable).reduce((acc, curr) => acc + curr, 0)
        let randomIndex = Math.random() * 100 // float within [0; 100[
        Object.entries(nextCharTable).some(([char, occurrenceNb]) => {
          const charFrequency = (occurrenceNb / nbOfNextCharOccurrences) * 100
          if (randomIndex >= charFrequency) {
            randomIndex -= charFrequency
            return false
          }
          charToAdd = char
          return true
        })
        outputName += charToAdd
        if (
          charToAdd === EMPTY_CHAR &&
          (!doesNameRespectNomenclature(outputName) || legacyGeneratedNames.includes(outputName))
        ) {
          outputName = ''
          generationWasReset = true
        }
      } while (charToAdd !== EMPTY_CHAR || generationWasReset)
      return outputName
    }
    range(nbWanted).forEach(() => output.push(generateNewName(occurrenceTable, output)))
    return output
  }
  const handleTileButtonClick = (populationName: string, critName: string, critValue: string): void => {
    selectedCriterium.value = { populationName, critName, critValue }
    generateNames()
  }
</script>

<template>
  <h2 w:m="b-8">Générateur de noms</h2>
  <h3 w:m="b-4">Générez aléatoirement 5 noms de personnages ou d'agglomérations</h3>
  <p>Choisissez un peuple, puis cliquez sur le type de nom à générer</p>
  <UseMousePressed v-slot="{ pressed }">
    <Flicking
      :options="flickingOptions"
      :plugins="flickingPlugins"
      :style="{ cursor: pressed ? 'grabbing' : 'grab' }"
      @move-start="() => (isCarouselMoving = true)"
      @move-end="() => (isCarouselMoving = false)"
    >
      <PopulationTile
        v-for="([popName, popData], index) in Object.entries(PopulationBase)"
        :key="index"
        :population-name="popName"
        :population-data="popData"
        :generation-trigger-callback="handleTileButtonClick"
        :is-carousel-moving="isCarouselMoving"
        class="card-panel"
      />
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
  </UseMousePressed>
</template>
