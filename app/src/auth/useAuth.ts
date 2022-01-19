import type { AuthPlugin } from './types'
import { authInstance } from './plugin'

/**
 * Returns the auth instance. Equivalent to using `$auth` inside
 * templates.
 */
export function useAuth(): AuthPlugin {
  return authInstance!
}
