import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void
export type Dictionary<T> = { [index: string]: T }
export type OccurrenceTable = Dictionary<Dictionary<number>>
