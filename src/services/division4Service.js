import api from "./config"

export const getAllDivision4 = async () => {
  try {
    const { data } = await api.get("division4", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getDivision4ById = async (id) => {
  try {
    const { data } = await api.get(`division4/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const countDivision4Entries = async () => {
  try {
    const { data } = await api.get("division4/count")
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getDivision4ByChunks = async (offset) => {
  try {
    const { data } = await api.get("division4/chunks", {
      params: {
        offset
      }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}