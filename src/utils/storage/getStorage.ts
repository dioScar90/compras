export const getStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}