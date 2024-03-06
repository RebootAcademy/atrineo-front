import api from "./config"

export const getOwnProfile = async () => {
  try {
    const { data } = await api.get('/user/profile', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return data  
  } catch (error) {
    console.error(error)
  }
}