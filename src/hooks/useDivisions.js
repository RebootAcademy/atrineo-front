import { useContext } from "react"
import { useQuery } from "react-query"

import { LocationContext } from "../context/locationContext"

import { getAllCountries } from "@/services/countryService"
import { getAllDivision1 } from "@/services/division2Service"
import { getAllDivision2 } from "@/services/division1Service"
import { getAllDivision3 } from "@/services/division3Service"
import { getAllDivision4 } from "@/services/division4Service"

export const useDivisions = () => {
  const { setLocations } = useContext(LocationContext)

  const countriesQuery = useQuery("countries", getAllCountries, {
    onSuccess: (countries) => {
      setLocations((prev) => ({ ...prev, countries }))
    }
  })

  const division1Query = useQuery("division1", getAllDivision1, {
    onSuccess: (division1) => {
      setLocations((prev) => ({ ...prev, division1 }))
    }
  })
  const division2Query = useQuery("division2", getAllDivision2, {
    onSuccess: (division2) => {
      setLocations((prev) => ({ ...prev, division2 }))
    }
  })
  const division3Query = useQuery("division3", getAllDivision3, {
    onSuccess: (division3) => {
      setLocations((prev) => ({ ...prev, division3 }))
    }
  })
  const division4Query = useQuery("division4", getAllDivision4, {
    onSuccess: (division4) => {
      setLocations((prev) => ({ ...prev, division4 }))
    }
  })

  const isLoading =
    countriesQuery.isLoading ||
    division1Query.isLoading ||
    division2Query.isLoading ||
    division3Query.isLoading ||
    division4Query.isLoading

  const isError =
    countriesQuery.isError ||
    division1Query.isError ||
    division2Query.isError ||
    division3Query.isError ||
    division4Query.isError

  return {
    isLoading,
    isError,
    data: {
      countries: countriesQuery.data,
      division1: division1Query.data,
      division2: division2Query.data,
      division3: division3Query.data,
      division4: division4Query.data,
    },
  }
}
