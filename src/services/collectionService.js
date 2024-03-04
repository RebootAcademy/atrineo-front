import api from './config'

export const getPublicCollections = async () => {
  try {
    const { data } = await api.get('collection/public')
    return data
  } catch (error) {
    console.error(error)
  }
}
