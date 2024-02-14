import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { Circle } from "react-leaflet"
import { LayerContext } from "../../../context/layerContext"

function GnpLayer() {
  const { collection } = useContext(CollectionContext)
  const { gnp } = useContext(LayerContext)

  const companiesBySelectedGnp = collection[0]?.data?.filter((company) => {
    console.log(company.gnp)
    return company.gnp === gnp
  })

  const circles = companiesBySelectedGnp?.map(company => (
    <Circle
      key={company._id}
      center={[company.latitude, company.longitude]}
      pathOptions={{ fillColor: "red", stroke: false, fillOpacity: 0.3 }}
      radius={company.gnp * 100}
    >
    </Circle>
  ))

  return <>{circles}</>
}

export default GnpLayer
