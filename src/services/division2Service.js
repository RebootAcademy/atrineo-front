import api from "./config"


export const getAllDivision1 = async () => {
  try {
    const { data } = await api.get("division1", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
