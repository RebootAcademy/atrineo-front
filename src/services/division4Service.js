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
