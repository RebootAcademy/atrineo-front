// import { Circle } from "react-leaflet"
// import { useDistrictsCoords } from "../../../hooks/useDistrictCoords"
// import PropTypes from 'prop-types'
// import { useContext } from "react"
// import { LayerContext } from "../../../context/layerContext"

// function PopulationLayer({ filterValue }) {
//   const data = useDistrictsCoords({})
//   const filteredData = data && data.filter(item => item.districtPopulation <= filterValue)

//   return (

//     <section>
//       {filteredData && filteredData.map((item, index) => (
//         <Circle
//           key={index}
//           center={[item.latitude, item.longitude]}
//           pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
//           radius={item.districtPopulation / 500}
//         />
//       ))}
//     </section>
//   )
// }

// PopulationLayer.propTypes = {
//   filterValue: PropTypes.number
// }

// export default PopulationLayer

import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../../hooks/useDistrictCoords"

const PopulationLayer = () => {
    const data = useDistrictsCoords({})

    return (
        <section>
            {data && data.map((item, index) => (
                <Circle
                    key={index}
                    center={[item.latitude, item.longitude]}
                    pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
                    radius={item.districtPopulation / 500}
                />
            ))}
        </section>
    )
}

export default PopulationLayer
