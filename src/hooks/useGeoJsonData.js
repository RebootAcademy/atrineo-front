import { useQuery } from "react-query"
import axios from "axios"

const urls = {
  country: import.meta.env.VITE_APP_COUNTRY_URL,
  division1: import.meta.env.VITE_APP_DIVISION1_URL,
  division2: import.meta.env.VITE_APP_DIVISION2_URL,
  division3: import.meta.env.VITE_APP_DIVISION3_URL,
}

// Función para realizar la solicitud HTTP
const fetchGeoJsonData = async (type) => {
  const { data } = await axios.get(urls[type])
  return data
}

export const useGeoJsonData = (type) => {
  return useQuery(["geoJsonData", type], () => fetchGeoJsonData(type), {
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 15, // 15 minutos
    onError: (error) => {
      console.error("Error fetching GeoJSON data:", error)
    },
  })
}
