import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useContext } from "react"
import { CollectionContext } from "../../context/collection"

const LayersControlComponent = () => {
  const { collection, setCollection } = useContext(CollectionContext)

  const displayMarkers = () => {
    const coords = collection.flatMap((item) =>
      item.data.map(dataItem => [dataItem.latitude, dataItem.longitude])
    )
    return coords
  }

  console.log(collection)


  return (
    <LayersControl position="topleft">
{/*       <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        
      /> */}       
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl.Overlay name='Startups' checked>
      <LayerGroup>
        <MarkerClusterGroup chunkedLoading>
          { displayMarkers() }
          
        </MarkerClusterGroup>
      </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default LayersControlComponent