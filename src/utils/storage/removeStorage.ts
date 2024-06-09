export const removeStorage = (...keys: string[]) => {
  keys.forEach(key => localStorage.removeItem(key))
}