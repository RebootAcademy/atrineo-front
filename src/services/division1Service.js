import api from "./config"


export const getAllDivision2 = async () => {
  try {
    const { data } = await api.get("division2", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
