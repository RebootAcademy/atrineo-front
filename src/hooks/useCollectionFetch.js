import { useMemo, useEffect, useState } from "react"
import { useQuery } from "react-query"

import {
  getOwnOrganizationCollections,
  getDemoCollection,
} from "@/services/collectionService"

import { collectionStore } from "@/utils/localforage"
import { checkCollectionVersion } from "@/services/collectionService"

export const useCollectionFetch = (user, setCollection, collection) => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)
  const [fetchNewData, setFetchNewData] = useState(false)

  useEffect(() => {
    async function loadFromCache() {
      const cachedData = await collectionStore.getItem("collection")
      if (cachedData) {
        const currentVersion = await checkCollectionVersion()
        if (cachedData.__v === currentVersion.__v) {
          setCollection(cachedData)
        } else {
          setFetchNewData(true)
        }
      } else {
        setFetchNewData(true)
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
      initialDataLoaded &&
      fetchNewData,
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
