// Global polyfills for SSR compatibility
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = globalThis
}

if (typeof window === 'undefined') {
  // @ts-ignore
  global.window = {}
}

export {}