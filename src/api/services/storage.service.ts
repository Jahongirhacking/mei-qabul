export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = (): string | null => localStorage.getItem('token')

export const clearStorage = () => {
  console.log('clearStorage');
  
  localStorage.removeItem('token')
}
