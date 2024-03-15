import api from './config'

// export const getDemoCollection = async () => {
//   console.log('public')
//   try {
//     const { data } = await api.get('collection/public')
//     return data
//   } catch (error) {
//     console.error(error)
//   }
// }

export const getOwnOrganizationCollections = async () => {
  try {
    const { data } = await api.get("collection/organization", {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return data.result
  } catch (error) {
    console.error(error)
  }
}

export const getDemoCollection = async () => {
  try {
    const { data } = await api.get(`collection/${import.meta.env.VITE_DEMO_ID}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data.result
  } catch (error) {
    console.error(error)
  }
}

export const getAllCollections = async () => {
  try {
    const { data } = await api.get("collection", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateCollection = async (id, latitude, longitude) => {
  try {
    const { data } = await api.patch(`collection/${id}`, {
      latitude: latitude,
      longitude: longitude
    }, { 
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}