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
  const latObj = dataItem.fields.find(field => field.fieldName === 'latitude')
  const lonObj = dataItem.fields.find(field => field.fieldName === 'longitude')

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
  return [Math.min(...values), Math.max(...values)]
}

export const calculateRadius = (value, minValue, maxValue) => {
  console.log(value, minValue, maxValue)
  // Define el rango de salida para los radios. Esto dependerá del tamaño que desees para tus círculos.
  const range = [0, 1000] // Ajusta esto según el tamaño deseado de tus círculos
  // Crea la escala de raíz cuadrada usando D3
  const sqrtScale = d3.scaleSqrt()
    .domain([minValue, maxValue])
    .range(range)
  // Usa la escala para calcular el radio basado en el valor de entrada
  return sqrtScale(value)
}

/* export const calculateRadius = (value) => {
  if (value < 10) {
    return value * 1000
  } else {
    const logScaleFactor = 1000
    return Math.log(value) * logScaleFactor
  }
} */

export const extractRegionNames = (array, division) => {
  const nameRegionFiltered = array
    .flatMap((region) => region.data)
    .filter((item) => item.locationId[division] !== null)
    .map((item) => {
      return {
        id: item.locationId[division]?._id,
        name: item.locationId[division]?.name,
      }
    })
    
  const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
    return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
  }, [])

  return  nameRegion.map((region) => region.name)
}
