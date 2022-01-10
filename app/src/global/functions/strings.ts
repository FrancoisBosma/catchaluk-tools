import { range } from './numbers'

const findAllIndexes = (st: string, ch: string) =>
  range(st.length).reduce((acc: number[], index: number) => {
    if (st[index] === ch) {
      acc.push(index)
    }
    return acc
  }, [])

export default findAllIndexes
