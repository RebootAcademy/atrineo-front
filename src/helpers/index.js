import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { point, polygon } from '@turf/helpers'
import * as d3 from 'd3'

/**
 * Función para verificar si un elemento está dentro de un polígono.
 * @param {Object} dataItem - El elemento a evaluar.
 * @param {Array} searchPolygon - Polígono de búsqueda.
 * @returns {boolean} - Verdadero si el elemento está dentro del polígono.
 */
export const isWithinPolygon = (dataItem, searchPolygon) => {
  if (!searchPolygon || !Array.isArray(searchPolygon) || searchPolygon.length === 0 || !Array.isArray(searchPolygon[0])) return true

  // Encuentra los objetos de latitud y longitud
  const latObj = dataItem?.fields?.find(field => field.fieldName === 'latitude')
  const lonObj = dataItem?.fields?.find(field => field.fieldName === 'longitude')

  // Verifica si ambos están presentes y son válidos
  const hasValidCoordinates = latObj != null && lonObj != null && latObj.fieldValue != null && lonObj.fieldValue != null
  if (!hasValidCoordinates) return false

  // Prepara las coordenadas para la verificación
  const itemCoords = [parseFloat(lonObj.fieldValue), parseFloat(latObj.fieldValue)]
  const itemPoint = point(itemCoords)
  const polygonCoordinates = searchPolygon[0].map(coord => [coord.lng, coord.lat])
  polygonCoordinates.push(polygonCoordinates[0])

  return booleanPointInPolygon(itemPoint, polygon([polygonCoordinates]))
}

export const extractNumericFields = (arr) => {
  return arr?.filter(
    (field) =>
      field.fieldType === "number" &&
      field.fieldName !== "latitude" &&
      field.fieldName !== "longitude" &&
      field.fieldName !== "districtId"
  )
}

export const extractStringOptions = (arr) => {
  return arr?.filter(
    (field) =>
      field.fieldType === "string" &&
      field.fieldName !== "name" &&
      field.fieldName !== "latitude" &&
      field.fieldName !== "longitude" &&
      field.fieldName !== "districtName"
  )
    .map((field) => field.fieldName)
}

export const extractBooleanOptions = (arr) => {
  return arr?.filter(
    (field) => field.fieldType === "boolean")
    .map((field) => field.fieldName)
}

export const createStringOptionsObject = (arr, data) => {
  const optionsObj = {}
  console.log(arr)
  arr?.forEach(option => {
    optionsObj[option] = new Set()
  })

  data?.forEach(row => {
    row.fields?.forEach(field => {
      if (arr?.includes(field.fieldName)) {
        optionsObj[field.fieldName].add(field.fieldValue)
      }
    })
  })

  for (const [key, value] of Object.entries(optionsObj)) {
    optionsObj[key] = Array.from(value)
  }
  return optionsObj
}

export const findMaxAndMinValues = (arr, name) => {
  const values = arr
    .flatMap((item) => item.fields)
    .filter((field) => field.fieldName === name)
    .map(item => item.fieldValue)
  return [Math.max(...values), Math.min(...values)]
}

export const calculateRadius = (value, minValue, maxValue) => {
  const range = [1, 3000]
  if (isNaN(value) || isNaN(minValue) || isNaN(maxValue) || minValue === maxValue) {
    return 1
  }
  if (minValue > maxValue) {
    return 1
  }
  const sqrtScale = d3.scaleSqrt()
    .domain([minValue, maxValue])
    .range(range)
  const calculatedRadius = sqrtScale(value)
  if (isNaN(calculatedRadius)) {
    return 1
  } 
  return calculatedRadius
}

export const extractRegionNames = (array, division, locations) => {
  if (!array || !Array.isArray(array.data)) {
    return []
  }
  const nameRegionFiltered = array.data
    .filter((item) => item.locationId[division] !== null)
    .map((item) => {
      const locationId = item.locationId[division]
      const locationName = locations[division].find(
        (l) => l._id === locationId
      )?.name
      return {
        id: locationId,
        name: locationName,
      }
    })
    
  const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
    return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
  }, [])

  return  nameRegion.map((region) => region.name)
}

export const checkAggregation = (value, prev, agg) => {
  if (!value) { return prev }
  switch (agg) {
  case ('sum'):
    return prev + value.fieldValue
  case ('count'):
    return ++prev
  case ('avg'):
    return { count: ++prev.count, sum: prev.sum + value.fieldValue }
  case ('max'):
    if (value.fieldValue > prev) return value.fieldValue
    return prev
  case ('min'):
    if (value.fieldValue < prev) return value.fieldValue
    return prev
  default:
    return prev
  }
}

export const calcAggregatedData = (data, xAxis, yAxis, division, aggregation, locations) => {
  const sums = data.reduce((acc, cur) => {
    let name
    if (xAxis === 'regions') {
      name = (locations.find(d => d._id === cur.locationId[division]))?.name
    } else {
      name = cur.fields
        .filter(f => f.fieldName === xAxis)
        .map(f => f.fieldValue)
    }
    if (!name) return acc
    if (!acc[name]) {
      acc[name] = aggregation === 'min' ? Infinity : (aggregation === 'avg' ? { count: 0, sum: 0 } : 0)
    }

    const filteredValues = cur.fields.filter(d => d.fieldName === yAxis)
    if (filteredValues.length > 0) {
      const value = filteredValues[0]
      acc[name] = checkAggregation(value, acc[name], aggregation)
    }
    return acc
  }, {})

  if (aggregation === 'avg') {
    return Object.entries(sums).map(([name, info]) => ({ name, sum: info.sum / info.count }))
  } else {
    return Object.entries(sums).map(([name, sum]) => ({ name, sum }))
  }
}

export const formatNumber = (num) => {
  if (num === null || isNaN(num)) {
    return null
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export const checkValue = (itemValue, layerKey, layerObj) => {
  if (layerObj.data.type !== 'startups') return true
  if (typeof layerObj.data[layerKey].value === 'number') {
    return itemValue >= layerObj.data[layerKey].value
  } else if (itemValue === "string") {
    return itemValue === layerObj.data[layerKey].value
  } else {
    return itemValue
  }
}