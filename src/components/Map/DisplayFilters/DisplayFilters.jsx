import { useContext, useState } from "react"
import { CollectionContext } from "../../../context/collectionContext"

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'
import MultipleSelectorComponent from "../MultipleSelector/MultipleSelector"

import {
  extractNumericFields,
  extractStringOptions,
  createStringOptionsObject,
  findMaxAndMinValues
} from '../../../helpers'

import PropTypes from 'prop-types'
import { LayerContext } from "@/context/layerContext"

function DisplayFilters({ layerObj, type }) {
  const { collection } = useContext(CollectionContext)
  const { getNextColor, mapDivision, minValue, maxValue } = useContext(LayerContext)

  const [activeSwitch, setActiveSwitch] = useState(false)

  const handleRegionChange = (value) => {
    layerObj.current.type = type
    const names = value.map(name => name.value)
    layerObj.current.regions = { names, division: mapDivision }
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
      const newColor = getNextColor()
      if (type === 'regions') {
        newState = {
          type: "regions",
          [target]: value,
          color: newColor,
          ...(minValue !== null && { minValue: minValue }),
          ...(maxValue !== null && { maxValue: maxValue }),
        }
      } else if (type === 'startups') {
        newState = { type: 'startups', ...newState, [target]: { value, color: newColor }}
      }
    }
    layerObj.current = newState
    setActiveSwitch(value !== 'remove' ? target : null)
  }


  let data
  let fields
  if (collection) {
    data = collection?.data
    fields = []
    fields
    let columnsObj = collection.columnTypes
    for (const key in columnsObj) {
      fields.push({ fieldName: key, fieldType: columnsObj[key] })
    }
  }

  const booleanFields = fields?.filter(field => field.fieldType === 'boolean')
  const numericFields = extractNumericFields(fields, collection?.columnTypes)
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