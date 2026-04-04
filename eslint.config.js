import antfu from '@antfu/eslint-config'

const ignores = [
  '.nuxt',
  '**/.nuxt/**',
  '.output',
  '**/.output/**',
  'node_modules',
  '**/node_modules/**',
  'public',
  '**/public/**',
]

export default antfu(
  {
    ignores,

    stylistic: {
      indent: 2,
      quotes: 'single',
    },

    typescript: true,
    vue: true,
    jsonc: true,
    yaml: true,

    rules: {
      // Require trailing commas in multiline structures to reduce git diff noise
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'always-multiline',
        exports: 'always-multiline',
        imports: 'always-multiline',
      }],

      // Require braces for all control flow blocks, even single-line bodies
      'curly': ['error', 'all'],

      // Require explicit `break` or `return` in each switch case to prevent unintentional fallthrough
      'no-fallthrough': ['error'],

      // Disallow reassigning function parameters to avoid subtle mutation side effects
      'no-param-reassign': ['error'],

      // Disallow expressions that are evaluated but whose result is never used
      'no-unused-expressions': ['error'],

      // Require usage of the global `process` object instead of importing it via `require('process')`
      'node/prefer-global/process': ['error', 'always'],

      // Disallow `async` functions that contain no `await`, as they add unnecessary microtask overhead
      'require-await': ['error'],

      // Require spaces around infix operators (e.g. `a + b` instead of `a+b`) for readability
      'space-infix-ops': ['error'],

      // Enforce 1TBS (one true brace style) for consistent block formatting
      'style/brace-style': ['error', '1tbs'],

      // Enforce `interface` over `type` for object type definitions for consistency
      'ts/consistent-type-definitions': ['error', 'interface'],

      // Disabled: conflicts with plugins and utils that return async functions without directly awaiting inside them
      'ts/no-misused-promises': 'off',

      // Disallow non-null assertions (`!`) to enforce explicit null checks instead of unsafe shortcuts
      'ts/no-non-null-assertion': ['error'],

      // Disabled: the amount of unsafe call violations across the codebase makes enabling this impractical
      'ts/no-unsafe-call': 'off',

      // Disabled: conflicts with synchronous functions that return promises (e.g. tRPC utility wrappers)
      'ts/promise-function-async': 'off',

      // Disabled: conflicts with idiomatic nullish checks used throughout the codebase
      'ts/strict-boolean-expressions': 'off',

      // Allow computed properties to implicitly return undefined for simpler conditional logic
      'vue/return-in-computed-property': 'off',
    },
  },
)
