import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig({
  outDir: 'dist',
  splitting: true,
  sourcemap: false,
  minify: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs'
    }
  },
  entry: ['src/index.ts'],
  define: {
    'process.env.SDK_VERSION': `"${pkg.version}"`
  }
})
