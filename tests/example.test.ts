// @vitest-environment nuxt

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import DuckWelcome from '~/components/DuckWelcome.vue'

it('my test', async () => {
  const component = await mountSuspended(DuckWelcome)
  expect(component.text()).toContain('Duck nuxt starter')
})
