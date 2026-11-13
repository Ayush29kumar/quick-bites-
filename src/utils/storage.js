// Safe localStorage helpers: never throw, fall back to the provided default.
export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be full or unavailable; the app keeps working in memory.
  }
}
