import api from "./config"

export const getPublicCollections = async () => {
  try {
    const { data } = await api.get('collection/public')
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}