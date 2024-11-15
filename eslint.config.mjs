// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    rules: {
      'antfu/top-level-function': 'off',
    },
  }),
  // ...your other rules
)
