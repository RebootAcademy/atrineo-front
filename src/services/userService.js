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
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const { data } = await api.get('/user', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getOneUser = async (id) => {
  try {
    const { data } = await api.get(`/user/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (id, body) => {
  try {
    const { data } = await api.patch(`/user/${id}`, body, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}