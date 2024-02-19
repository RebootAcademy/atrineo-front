import { useContext } from "react"
import { CollectionContext } from "../../../context/collectionContext"
import { Circle } from "react-leaflet"
import { LayerContext } from "../../../context/layerContext"
import { isWithinPolygon } from "../../../helpers"

function GnpLayer() {
  const { collection } = useContext(CollectionContext)
  const { gnp, searchPolygon } = useContext(LayerContext)

  const companiesBySelectedGnp = collection[0]?.data
    .filter((company) => company.gnp <= gnp[0])
    .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon)
  )

  const circles = companiesBySelectedGnp?.map(company => (
    <Circle
      key={company._id}
      center={[company.latitude, company.longitude]}
      pathOptions={{ fillColor: "black", stroke: false, fillOpacity: 0.3 }}
      radius={company.gnp / 35000}
    >
    </Circle>
  ))

  return <>{circles}</>
}

export default GnpLayer
