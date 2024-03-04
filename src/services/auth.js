import api from "./config"

export async function login(loginData) {
  try {
    const { data } = await api.post('/auth/login', loginData)
    console.log('Login response:', data)
    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}