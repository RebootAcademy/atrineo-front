import api from './config'

export const getPublicCollections = async () => {
  try {
    const { data } = await api.get('collection/public')
    return data
  } catch (error) {
    console.error(error)
  }
}

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