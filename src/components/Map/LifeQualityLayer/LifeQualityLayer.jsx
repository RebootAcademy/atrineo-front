import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { Circle } from "react-leaflet"
import { LayerContext } from "../../../context/layerContext"
import PopupComponent from "../../ui/PopupComponent/PopupComponent"

function LifeQualityLayer() {
  const { collection } = useContext(CollectionContext)
  const { lifeQuality } = useContext(LayerContext)

  const companiesBySelectedLifeQuality = collection[0]?.data?.filter((company) => {
    return company.lifeQuality === lifeQuality
  })

  let pathOptions = { fillColor: "orange", stroke: false, fillOpacity: 0.3 }
  if (lifeQuality === 'medium') pathOptions = { fillColor: "yellow", stroke: false, fillOpacity: 0.3 }
  else if (lifeQuality === 'high') pathOptions = { fillColor: "green", stroke: false, fillOpacity: 0.3 }
  const circles = companiesBySelectedLifeQuality?.map(company => (
    <Circle
      key={company._id}
      center={[company.latitude, company.longitude]}
      pathOptions={pathOptions}
      radius={4000}
    >
        <PopupComponent name={company.name} />
    </Circle>
  ))

  return <>{circles}</>
}

export default LifeQualityLayer
