import api from "./config"

export const getOwnProfile = async () => {
  try {
    const { data, success } = await api.get('/user/profile', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    console.log(data, success)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}