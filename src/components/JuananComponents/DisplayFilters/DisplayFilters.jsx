//SUSTITUIRÍA A FILTEROPTIONS
// import { v4 as uuidv4 } from 'uuid'
import { useContext } from "react"
import PropTypes from 'prop-types'

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'
import MultipleSelectorComponent from "../MultipleSelector/MultipleSelector"
import { CollectionContext } from "../../../context/collectionContext"

import {
  extractNumericFields,
  extractStringOptions,
  createStringOptionsObject,
  findMaxAndMinValues
} from '../../../helpers'

function DisplayFilters({ layerObj, type }) {
  const { collection } = useContext(CollectionContext)

  const handleRegionChange = (value) => {
    const names = value.map(name => name.value)
    layerObj.current.regions = names
  }

  const handleFilterChange = (value, target) => {
    layerObj.current.type = type
    if (value === 'remove') {
      delete layerObj.current[target]
    } else {
      layerObj.current = { ...layerObj.current, [target]: value, fieldName: target }
    }
    console.log(layerObj.current)
  }

  let data
  let fields
  if (collection) {
    data = collection[0]?.data
    fields = data[0].fields
  }

  //hacer variable con los distritos de la nueva base de datos - que no se exactamente cual es
  const booleanFields = fields?.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields)
  const stringOptions = extractStringOptions(fields) //Filtra las columnas que van a usarse como radio buttons

  // Almacena las distintas opciones posibles para cada grupo de radio buttons
  const optionsObj = createStringOptionsObject(stringOptions, collection[0]?.data)

  const displayStrings = (arr) => {
    return arr?.map((option, index) => {
      return (
        <RadioComponent
          key={index}
          name={option}
          handleChange={handleFilterChange}
          options={optionsObj[option]}
        />
      )
    })
  }

  const displayNumericFields = () => {
    if (type === 'startups') {
      return numericFields.map((field, index) => {
        const [max, min] = findMaxAndMinValues(data, field.fieldName)
        return (
          <SliderComponent
            key={index}
            name={field.fieldName}
            handleChange={handleFilterChange}
            minValue={min}
            maxValue={max}
          />
        )
      })
    } else {
      return numericFields.map((field, index) => {
        return (
          <SwitchComponent
            key={index}
            name={field.fieldName}
            handleChange={handleFilterChange}
          />
        )
      })
    }
  }

  const displayBooleanFields = () => {
    return booleanFields?.map((field, index) => {
      return (
        <SwitchComponent
          key={index}
          name={field.fieldName}
          handleChange={handleFilterChange}
        />
      )
    })
  }

  const displayMultipleSelectorFields = () => {
    return (
      <MultipleSelectorComponent onValueChange={handleRegionChange} />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {displayMultipleSelectorFields()}
      {type === 'startups' && displayBooleanFields()}
      {displayNumericFields()}
      {type === 'startups' && displayStrings(stringOptions)}
    </div>
  )
}

DisplayFilters.propTypes = {
  title: PropTypes.string,
  layers: PropTypes.array,
  layerObj: PropTypes.object,
  type: PropTypes.string
}

export default DisplayFilters



// if (Object.hasOwn(layerObj.current, 'regions')) {
//   const incomingLength = value.length
//   const currentLength = layerObj.current.regions.length
//   if (incomingLength > currentLength) {
//     const newValue = value[value.length - 1].value
//     console.log(newValue)
//     layerObj.current.regions.push(newValue)
//   } else {

//   }
// } else {
//   layerObj.current.regions = [value[0].value]
// }