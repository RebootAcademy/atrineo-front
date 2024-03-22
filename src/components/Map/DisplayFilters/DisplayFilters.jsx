import { useContext, useState } from "react"
import { CollectionContext } from "../../../context/collectionContext"

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'
import MultipleSelectorComponent from "../MultipleSelector/MultipleSelector"

import { getNextColor } from "@/helpers/colors"
import {
  extractNumericFields,
  extractStringOptions,
  createStringOptionsObject,
  findMaxAndMinValues
} from '../../../helpers'

import PropTypes from 'prop-types'

function DisplayFilters({ layerObj, type }) {
  const { collection } = useContext(CollectionContext)
  const [activeSwitch, setActiveSwitch] = useState(false)

  const handleRegionChange = (value) => {
    layerObj.current.type = type
    const names = value.map(name => name.value)
    layerObj.current.regions = names
  }

  const handleFilterChange = (value, target) => {
    let newState = { ...layerObj.current }

    if (value === 'remove') {
      delete newState[target]
      const keys = Object.keys(newState).filter(key => key !== 'type')
      if (keys.length === 0) {
        delete newState['type']
      } else {
        if (newState.type === 'startups' && keys.length > 0) {
          newState.type = 'startups'
        }
      }
    } else {
      const color = getNextColor()
      if (type === 'regions') {
        newState = { type: 'regions', [target]: value, color }
      } else if (type === 'startups') {
        newState[target] = value
        newState.color = color
        newState.type = type
      }
    }
    layerObj.current = newState
    setActiveSwitch(value !== 'remove' ? target : null)
    console.log(layerObj.current)
  }

  let data
  let fields
  if (collection) {
    data = collection?.data
    fields = data[0].fields
  }

  //hacer variable con los distritos de la nueva base de datos - que no se exactamente cual es
  const booleanFields = fields?.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields)
  const stringOptions = extractStringOptions(fields) //Filtra las columnas que van a usarse como radio buttons

  // Almacena las distintas opciones posibles para cada grupo de radio buttons
  const optionsObj = createStringOptionsObject(stringOptions, collection?.data)

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
        const isActive = activeSwitch === field.fieldName
        const toggleSwitch = () => {
          const newValue = !isActive ? field.fieldName : 'remove'
          handleFilterChange(newValue, field.fieldName)
        }
        return (
          <SwitchComponent
            key={index}
            name={field.fieldName}
            handleChange={toggleSwitch}
            isActive={isActive}
          />
        )
      })
    }
  }

  const displayBooleanFields = () => {
    return booleanFields.map((field, index) => {
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
    <div className="flex flex-col gap-4 ml-4 mb-4">
      {type === 'startups' && displayMultipleSelectorFields()}
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