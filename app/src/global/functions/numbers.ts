const floorRoundUp = (nb: number) => ~~nb // A better performing alternative to Math.floor
const randomInt = (max: number) => floorRoundUp(Math.random() * max)
const range = (end: number, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step)

export { floorRoundUp, randomInt, range }
