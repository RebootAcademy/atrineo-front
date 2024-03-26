import api from "./config"

export async function login(loginData) {
  try {
    const { data } = await api.post('/auth/login', loginData)
    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}