import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { point, polygon } from "@turf/helpers"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const filterItemsByPolygon = (items, searchPolygon) => {
  if (!searchPolygon || searchPolygon.length === 0) {
    return items
  }

  const polygonCoordinates = searchPolygon[0].map(coord => [coord.lat, coord.lng])
  polygonCoordinates.push(polygonCoordinates[0]) // Cierra el polígono

  const searchPoly = polygon([polygonCoordinates])

  return items.filter(item => {
    const itemPoint = point([parseFloat(item.longitude), parseFloat(item.latitude)])
    return booleanPointInPolygon(itemPoint, searchPoly)
  })
}
