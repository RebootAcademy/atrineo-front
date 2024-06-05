import api from "./config"

export const cleanDataFromCollection = async (id) => {
  try {
    const res = await api.delete(`/data/clean/${id}`, {
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