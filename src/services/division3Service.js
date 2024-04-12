import api from "./config"


export const getAllDivision3 = async () => {
  try {
    const { data } = await api.get("division3", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
