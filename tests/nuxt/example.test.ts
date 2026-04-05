// @vitest-environment nuxt

import { DuckWelcome } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'

it('my test', async () => {
  const component = await mountSuspended(DuckWelcome)
  expect(component.text()).toContain('Duck Nuxt Starter')
})
