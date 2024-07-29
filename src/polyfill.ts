import { AbortController } from 'abortcontroller-polyfill/dist/abortcontroller'

const g =
  typeof window !== 'undefined'
    ? window
    : typeof global === 'object'
    ? global
    : this

if (g && !g.AbortController) {
  g.AbortController = AbortController
}
