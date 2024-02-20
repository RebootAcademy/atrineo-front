//SUSTITUIRÍA A FILTEROPTIONS
import { v4 as uuidv4 } from 'uuid'
import { useContext } from "react"
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card/Card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../ui/Select/select"

import RadioComponent from '../RadioComponent/RadioComponent'
import SwitchComponent from '../SwitchComponent/SwitchComponent'
import SliderComponent from '../SliderComponent/SliderComponent'

import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"

function DisplayFilters() {
  const { collection } = useContext(CollectionContext)
  const layer = useContext(LayerContext)

  const handleSliderChange = (e) => {
    console.log(e)
  }

  const handleSwitchChange = (e) => {
    console.log(e)
  }

  const handleRadioChange = (e) => {
    console.log(e)
  }

  const fields = collection[0]?.data[0].fields.sort((a,b) => {
    return (
      a.fieldType.localeCompare(b.fieldType) - 
      b.fieldType.localeCompare(a.fieldType)
    )
  }).filter(field => field.fieldName !== 'districtId' && 
                      field.fieldName !== 'districtName' &&
                      field.fieldName !== 'name' &&
                      field.fieldName !== 'latitude' &&
                      field.fieldName !== 'longitude'
                      )

  const stringOptions = fields
    .filter(field => field.fieldType === 'string' && 
                      field.fieldName !== 'name' &&
                      field.fieldName !== 'latitude' &&
                      field.fieldName !== 'longitude' &&
                      field.fieldName !== 'districtName'
            )
    .map(field =>  field.fieldName )

  const optionsObj = {};

  stringOptions.forEach(option => {
    optionsObj[option] = new Set();
  })

  collection[0]?.data.forEach(row => {
    row.fields.forEach(field => {
      if (stringOptions.includes(field.fieldName)) {
        optionsObj[field.fieldName].add(field.fieldValue);
      }
    })
  })

  for (const [key, value] of Object.entries(optionsObj)) {
    optionsObj[key] = Array.from(value);
  }

  const checkField = (field) => {
    switch (field.fieldType) {
      case 'number':
        return( 
            <SliderComponent 
              name={field.fieldName}
              handleChange={handleSliderChange}
            />
          )
      case 'boolean':
        return (
          <SwitchComponent
            name={field.fieldName}
            handleChange={handleSwitchChange}
          />
        )
    }
  }

  const displayStrings = (arr) => {
    return arr.map(option => {
      return (
        <RadioComponent
          name={option}
          handleChange={handleRadioChange}
          options={optionsObj[option]}
        />
      )
    })
  }

  const displayFields = () => {
    return fields.map(field => {
      return(
        <>
          { checkField(field) }
        </>
      )
    })
  }

  return (
    <div className="flex flex-col gap-4">
      { displayFields() }
      { displayStrings(stringOptions) }
    </div>
  )
}

DisplayFilters.propTypes = {
  title: PropTypes.string,
  layers: PropTypes.array
}

export default DisplayFilters