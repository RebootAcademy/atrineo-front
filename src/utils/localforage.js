// src/utils/localForageConfig.js
import localForage from "localforage"

const locationStore = localForage.createInstance({
  name: "geoData",
  storeName: "locations",
})

const collectionStore = localForage.createInstance({
  name: "userData",
  storeName: "collections",
})

export { locationStore, collectionStore }
