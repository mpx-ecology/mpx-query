import { vi } from 'vitest'

vi.mock('@mpxjs/core', async () => {
  const mpx = await vi.importActual('@mpxjs/core')
  return {
    ...(mpx as any),
    onScopeDispose: vi.fn(),
    getCurrentInstance: vi.fn(() => ({ proxy: {} }))
  }
})
