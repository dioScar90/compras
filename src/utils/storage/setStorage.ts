export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}