//SUSTITUIRÍA A FILTEROPTIONS
// import { v4 as uuidv4 } from 'uuid'
import { useContext, useRef } from "react"
import PropTypes from 'prop-types'

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'

import { CollectionContext } from "../../../context/collectionContext"

import { 
  extractNumericFields,
  extractStringOptions,
  createStringOptionsObject, 
  findMaxAndMinValues
} from '../../../helpers'

function DisplayFilters({layerObj}) {
  const { collection } = useContext(CollectionContext)

  const handleFilterChange = (value, target) => {
    if (value === 'remove') {
      delete layerObj.current[target]
    } else {
      layerObj.current = { ...layerObj.current, [target]:value }
    }
    console.log(layerObj.current)
  }

  const data = collection[0]?.data
  const fields = data[0].fields

  const booleanFields = fields.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields)
  const stringOptions = extractStringOptions(fields) //Filtra las columnas que van a usarse como radio buttons

  // Almacena las distintas opciones posibles para cada grupo de radio buttons
  const optionsObj = createStringOptionsObject(stringOptions, collection[0]?.data)

  const displayStrings = (arr) => {
    return arr.map((option, index) => {
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
  }

  const displayBooleanFields = () => {
    return booleanFields.map((field, index) => {
      return(
        <SwitchComponent
          key={index}
          name={field.fieldName}
          handleChange={handleFilterChange}
        />
      )
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/*FALTA METER EL SELECTOR DE LOS DISTRITOS*/ }
      { displayBooleanFields() }
      { displayNumericFields() }
      { displayStrings(stringOptions) }
    </div>
  )
}

DisplayFilters.propTypes = {
  title: PropTypes.string,
  layers: PropTypes.array
}

export default DisplayFilters