import { test as base } from '@playwright/test'
import { createOrderLockupActions } from './actions/orderLockupActions'

type App = {
  orderLockup: ReturnType<typeof createOrderLockupActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLockup: createOrderLockupActions(page)
    }
        // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(app)
  }
})

export { expect } from '@playwright/test'
