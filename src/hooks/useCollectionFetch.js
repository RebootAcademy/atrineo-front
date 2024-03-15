import { useMemo } from "react"
import { useQuery } from "react-query"

import {
  getOwnOrganizationCollections,
  getDemoCollection,
} from "@/services/collectionService"

export const useCollectionFetch = (user, setCollection, collection) => {
  const { queryKey, fetcherFunction } = useMemo(() => {
    if (user?.role === "wizard") {
      return {
        queryKey: "demoCollection",
        fetcherFunction: getDemoCollection,
      }
    } else {
      return {
        queryKey: "organizationCollections",
        fetcherFunction: getOwnOrganizationCollections,
      }
    }
  }, [user])

  return useQuery(queryKey, fetcherFunction, {
    enabled: Object.keys(user).length > 0 && 
      Object.keys(collection).length === 0,
    onSuccess: (data) => {
      if (user.role === "wizard") {
        setCollection(data)
      } else if (data) {
        setCollection(data[0])
      }
    }
  })
}
