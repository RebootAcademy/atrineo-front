import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"

import { LocationContext } from "../context/locationContext"

import { getAllCountries } from "@/services/countryService"
import { getAllDivision1 } from "@/services/division2Service"
import { getAllDivision2 } from "@/services/division1Service"
import { getAllDivision3 } from "@/services/division3Service"
import { getAllDivision4 } from "@/services/division4Service"

import { locationStore } from "@/utils/localforage"

export const useDivisions = () => {
  const { locations, setLocations } = useContext(LocationContext)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    async function loadFromCache() {
      const countries = await locationStore.getItem("countries")
      const division1 = await locationStore.getItem("division1")
      const division2 = await locationStore.getItem("division2")
      const division3 = await locationStore.getItem("division3")
      const division4 = await locationStore.getItem("division4")

      setLocations((prev) => ({
        ...prev,
        countries: countries || prev.countries,
        division1: division1 || prev.division1,
        division2: division2 || prev.division2,
        division3: division3 || prev.division3,
        division4: division4 || prev.division4,
      }))

      setInitialDataLoaded(true) // Indicates cache loading is done
    }

    loadFromCache()
  }, [setLocations])

  const storeData = async (key, data) => {
    try {
      await locationStore.setItem(key, data)
    } catch (error) {
      console.error("Failed to store data", error)
    }
  }

  const countriesQuery = useQuery("countries", getAllCountries, {
    onSuccess: (countries) => {
      setLocations((prev) => ({ ...prev, countries: countries.result }))
      storeData('countries', countries.result)
    },
    enabled: initialDataLoaded &&
    !locations.countries
  })

  const division1Query = useQuery("division1", getAllDivision1, {
    onSuccess: (division1) => {
      setLocations((prev) => ({ ...prev, division1: division1.result }))
      storeData("division1", division1.result)
    },
    enabled: initialDataLoaded &&
    !locations.division1,
  })

  const division2Query = useQuery("division2", getAllDivision2, {
    onSuccess: (division2) => {
      setLocations((prev) => ({ ...prev, division2: division2.result }))
      storeData("division2", division2.result)
    },
    enabled: initialDataLoaded &&
    !locations.division2,
  })
  
  const division3Query = useQuery("division3", getAllDivision3, {
    onSuccess: (division3) => {
      setLocations((prev) => ({ ...prev, division3: division3.result }))
      storeData("division3", division3.result)
    },
    enabled: initialDataLoaded &&
    !locations.division3,
  })

  const division4Query = useQuery("division4", getAllDivision4, {
    onSuccess: (division4) => {
      setLocations((prev) => ({ ...prev, division4: division4.result }))
      storeData("division4", division4.result)
    },
    enabled: initialDataLoaded /*&&
    !locations.division4,*/
  })

  return {
    data: {
      countries: countriesQuery.data,
      division1: division1Query.data,
      division2: division2Query.data,
      division3: division3Query.data,
      division4: division4Query.data,
    },
  }
}
