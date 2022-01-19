import type { App } from '@vue/devtools-api'
import type { AuthPlugin } from './types'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { watch } from 'vue'

const stateType = 'Auth Plugin'

export function setupDevtools(app: App, plugin: AuthPlugin) {
  setupDevtoolsPlugin(
    {
      id: 'basic-auth-plugin',
      label: 'Basic Auth Plugin',
      componentStateTypes: [stateType],
      app,
    },
    (api) => {
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push({
          type: stateType,
          key: '$auth',
          value: plugin,
        })
      })

      watch(plugin, () => {
        api.notifyComponentUpdate()
      })
    }
  )
}
