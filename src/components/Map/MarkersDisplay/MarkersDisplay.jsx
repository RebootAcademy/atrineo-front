/* eslint-disable no-unused-vars */
import MarkerComponent from '../MarkerComponent/MarkerComponent'

function MarkersDisplay ({ data }) {
  console.log(data)

  const displayMarkers = () => {
      return data
        .map((item, index) => {
          const latObj = item.fields.find(field => field.fieldName === 'latitude')
          const lonObj = item.fields.find(field => field.fieldName === 'longitude')
          const nameObj = item.fields.find(field => field.fieldName === 'name')
          return (
            <MarkerComponent
              key={index}
              coords={{ latitude: latObj.fieldValue, longitude: lonObj.fieldValue }}
              name={nameObj.fieldValue}
            />
          )
        })
      }

  return (
    <div>{displayMarkers()}</div>
  )
}

export default MarkersDisplay
