import { useMemo, useEffect, useState } from "react"
import { useQuery } from "react-query"

import {
  getOwnOrganizationCollections,
  getDemoCollection,
} from "@/services/collectionService"

import { collectionStore } from "@/utils/localforage"

export const useCollectionFetch = (user, setCollection, collection) => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    async function loadFromCache() {
      const cachedData = await collectionStore.getItem("collection")
      if (cachedData) {
        setCollection(cachedData)
      }
      setInitialDataLoaded(true)
    }
    loadFromCache()
  }, [setCollection])

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
      Object.keys(collection).length === 0 &&
      initialDataLoaded,
    onSuccess: (data) => {
      if (user.role === "wizard") {
        setCollection(data)
        collectionStore.setItem('collection', data)
      } else if (data) {
        setCollection(data[0])
        collectionStore.setItem("collection", data[0])
      }
    }
  })
}
