import api from "./config"

export const uploadCsv = async (data, type, name) => {
  try {
    const payload = {
      body: data,
      collectionType: type,
      name
    }

    const res = await api.post(`/data/demo`, payload, {
      headers: {
        token: localStorage.getItem("token"),
      }
    })
    return res
  } catch (error) {
    console.error(error)
    throw new Error("Cannot send data")
  }
}

export const addDataChunck = async (id, data, type, name, isFirst) => {
  try {
    const payload = {
      body: data,
      collectionType: type,
      name,
      isFirst
    }

    const res = await api.post(`/data/chunk/${id}`, payload, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return res
  } catch (error) {
    console.error(error)
    throw new Error("Cannot send data")
  }
}

export const uploadGeojson = async (data, type) => {
  try {
    const res = await api.post(
      `/${type}`,
      data,
    )
    return res
  } catch (error) {
    console.error(error)
    throw new Error("Cannot send data")
  }
}

export const uploadCsvCity = async (data) => {
  try {
    const res = await api.post(
      `/division4`,
      data,
    )
    return res
  } catch (error) {
    console.error(error)
    throw new Error("Cannot send data")
  }
}