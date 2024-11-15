import antfu from '@antfu/eslint-config'

export default await antfu({
  vue: true,
  typescript: './.nuxt/tsconfig.json',
  rules: {
    'antfu/top-level-function': 'off',
  },
})
