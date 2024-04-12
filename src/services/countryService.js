import api from "./config"


export const getAllCountries = async () => {
  try {
    const { data } = await api.get("country", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
