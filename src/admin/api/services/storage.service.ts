export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = (): string | null => localStorage.getItem('token')

export const setSavedRole = (role: string) => {
  localStorage.setItem('role', role)
}

export const getSavedRole = (): string | null => localStorage.getItem('role')

export const clearStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}
