//THIS FILE IS NOT BEING USED. KEEPING IT JUST IN CASE

import { 
  getDivision4ByChunks, 
  countDivision4Entries 
} from "@/services/division4Service"

// const convertToGeoJson = (data) => {
//   return {
//     type: "FeatureCollection",
//     features: data.map((entry, idx) => ({
//       type: "Feature",
//       id: idx,
//       properties: {
//         name: entry.name,
//         type: entry.type,
//         postalCode: entry.geojsonId,
//         geojsonId: entry.geojsonId,
//       },
//       geometry: {
//         type: "Polygon",
//         coordinates: entry.geometry[0]
//       }
//     }))
//   }
// }

const convertToGeoJson = (data) => {
  return {
    type: "FeatureCollection",
    features: data
      .map((entry, idx) => {
        const coordinates = entry.geometry?.[0] || []
        if (!Array.isArray(coordinates) || coordinates.length === 0) {
          console.warn(`Invalid coordinates for entry ${idx}:`, coordinates)
          return null
        }

        return {
          type: "Feature",
          id: idx,
          properties: {
            name: entry.name,
            type: entry.type,
            postalCode: entry.geojsonId,
            geojsonId: entry.geojsonId,
          },
          geometry: {
            type: "Polygon",
            coordinates: coordinates,
          },
        }
      })
      .filter((feature) => feature !== null)
  }
}


export const getAllDivision4Data = async () => {
  const {result: totalEntries} = await countDivision4Entries()

  let offset = -1
  const limit = 25
  let allData = []

  const totalChunks = Math.ceil(totalEntries / limit)
  const chunksArr = new Array (totalChunks).fill('empty')

  const promiseArr = chunksArr.map(async () => {
    offset++
    const { result } = await getDivision4ByChunks(offset)
    allData = [ ...allData, ...result ]
    return result
  })

  await Promise.all(promiseArr)

  const filtered = allData.filter(
    (d) => d.referencedId === "65aa97dbbca05bd6d85ffe9d"
  )

  const geoData = convertToGeoJson(filtered)

  return geoData
}