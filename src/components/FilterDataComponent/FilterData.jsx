import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
//import { getPublicCollections } from "../../services/collectionService"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"

function FilterData({ mapDisivion }) {
  const { collection } = useContext(CollectionContext)
  const geoJson = useGeoJsonData(mapDisivion)
  //console.log(geoJson)

  //Verifica si geoJson es válido
  if (!geoJson || !geoJson.features) {
    //console.error(error)
    return null
  }

  const division3Names = collection && collection[0]?.data
    ? collection[0].data.map(item => ({ location: item.locationId && item.locationId.division3 && item.locationId.division3.name }))
    : []
  console.log("Division3:", division3Names)


  //Verifica si name3Data.feature es válido

  const name3Data = geoJson
  if (!name3Data || !name3Data.features) {
    //console.error(error)
    return null
  }

  //Recorre el geoJson a través de name3Data y almacena cada NAME_3 
  const name3Objets = []
  name3Data.features.forEach(feature => {
    const name = feature.properties.NAME_3
    name3Objets.push( name )
  })
  //console.log("NAME_· es:", name3Objets)
}



export default FilterData
