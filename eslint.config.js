import antfu from '@antfu/eslint-config'

export default await antfu({
  vue: true,
  rules: {
    'antfu/top-level-function': 'off',
  },
})
