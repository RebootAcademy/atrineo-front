//SUSTITUIRÍA A FILTEROPTIONS
import { v4 as uuidv4 } from 'uuid'
import { useContext, useRef } from "react"
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card/Card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../ui/Select/select"

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'

import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"

import { 
  extractNumericFields,
  extractStringOptions,
  createStringOptionsObject, 
  findMaxAndMinValues
} from '../../../helpers'

function DisplayFilters() {
  const { collection } = useContext(CollectionContext)
  const layer = useContext(LayerContext)

  const layerRef = useRef({}) //Objeto con los filtros modificados para esta nueva capa

  const handleFilterChange = (value, target) => {
    if (value === 'remove') {
      delete layerRef.current[target]
    } else {
      layerRef.current = { ...layerRef.current, [target]:value }
    }
    console.log(layerRef.current)
  }

  const data = collection[0]?.data
  const fields = data[0].fields

  const booleanFields = fields.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields)
  const stringOptions = extractStringOptions(fields) //Filtra las columnas que van a usarse como radio buttons

  // Almacena las distintas opciones posibles para cada grupo de radio buttons
  const optionsObj = createStringOptionsObject(stringOptions, collection[0]?.data)

  const displayStrings = (arr) => {
    return arr.map(option => {
      return (
        <RadioComponent
          name={option}
          handleChange={handleFilterChange}
          options={optionsObj[option]}
        />
      )
    })
  }

  const displayNumericFields = () => {
    return numericFields.map(field => {
      const [max, min] = findMaxAndMinValues(data, field.fieldName)
      return (
        <SliderComponent
          name={field.fieldName}
          handleChange={handleFilterChange}
          minValue={min}
          maxValue={max}
        />
      )
    })
  }

  const displayBooleanFields = () => {
    return booleanFields.map(field => {
      return(
        <>
          <SwitchComponent
            name={field.fieldName}
            handleChange={handleFilterChange}
          />
        </>
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