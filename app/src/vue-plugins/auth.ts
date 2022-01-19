import type { UserModule } from '@SRC/types'
import axiosInstance from '@SRC/api/axios'
import { createAuth } from '@SRC/auth'
import { router } from '@SRC/router'

export const install: UserModule = ({ app }) => {
  const auth = createAuth({
    router,
    loginRedirectRoute: { name: 'index' },
    logoutRedirectRoute: { name: 'index' },
    autoConfigureNavigationGuards: true,
    axios: {
      instance: axiosInstance,
      autoAddAuthorizationHeader: true,
      // authorizationHeaderPrefix: 'Token', // default: 'Bearer'
    },
  })

  app.use(auth)
}
