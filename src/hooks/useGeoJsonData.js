import { useState, useEffect } from "react"
import axios from "axios"

const urls = {
  country: import.meta.env.VITE_APP_COUNTRY_URL,
  division1: import.meta.env.VITE_APP_DIVISION1_URL,
  division2: import.meta.env.VITE_APP_DIVISION2_URL,
  division3: import.meta.env.VITE_APP_DIVISION3_URL,
}

export const useGeoJsonData = (type) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(urls[type])
        setData(res.data)
      } catch (error) {
        console.error('Error fetching GeoJSON data: ', error)
      }
    }
    fetchData()
  }, [type])

  return data
}



