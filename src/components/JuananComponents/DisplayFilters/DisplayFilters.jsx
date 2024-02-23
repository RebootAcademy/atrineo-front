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
  createStringOptionsObject 
} from '../../../helpers'
//import MultipleSelector from "../../ui/MultiSelector/multple-selector"

function DisplayFilters() {
  const { collection } = useContext(CollectionContext)

  const layerRef = useRef({}) //Objeto con los filtros modificados para esta nueva capa

  const handleFilterChange = (value, target) => {
    layerRef.current = { ...layerRef.current, [target]:value }
    console.log(layerRef.current)
  }

  const fields = collection[0]?.data[0].fields

  //function para poder seleccionar All
  // const onDistrictNameChange = (districts) => {
  //   const isAllSelected = districts.some(district => district.value === 'All')
  //   if (isAllSelected) {
  //     setSelectedNameDistrict(districtSelection())
  //   } else {
  //     setSelectedNameDistrict(districts)
  //   }
  // } 

  //hacer variable con los distritos de la nueva base de datos - que no se exactamente cual es
  //const multipleSelector = 
  const booleanFields = fields?.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields)
  const stringOptions = extractStringOptions(fields) //Filtra las columnas que van a usarse como radio buttons

  // Almacena las distintas opciones posibles para cada grupo de radio buttons
  const optionsObj = createStringOptionsObject(stringOptions, collection[0]?.data)

  //crear la function para mostar el multipe selector
  // const displayMultipleSelector = () => {
  //   return (()) => {
  //     return (
  //       <MultipleSelector
  //         key={index}
  //         name={field.fieldName}
  //         handleChange={onDistrictNameChange}
  //       />
  //     )
  //   }
  // }

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
    return numericFields?.map((field, index) => {
      return (
        <SliderComponent
          key={index}
          name={field.fieldName}
          handleChange={handleFilterChange}
        />
      )
    })
  }

  const displayBooleanFields = () => {
    return booleanFields?.map((field, index) => {
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