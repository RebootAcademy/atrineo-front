import { useEffect, useState } from "react";
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import { selectedStyle, below10, between10and20, between20and35, over35, defaultStyle } from './Styles'


const HeatMapLayer = () => {
    const data = useGeoJsonData(mapDivision)
    const [selectRegion, setSelectRegion] = useState(null)

    useEffect(() => {
        setSelectRegion(null)
    }, [mapDivision])

    const setStyle = (feature) => {
        const currentGroupId = feature.properties.ID_3
        // const selectedClass = 'bg-red-400'
        // const default = ''

        if (selectRegion && selectRegion.feature.properties.ID_3 === currentGroupId)
            return selectedStyle
    }

    const onEachFeature = (feature, layer) => {
        layer.on('click', () => {
            console.log(feature)
            if (mapDivision == 'country') {
                setSelectRegion((prevSelectedRegion) => {
                    return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_0 === feature.properties.ID_0
                        ? null
                        : layer
                })
            } else if (mapDivision == 'division1') {
                setSelectRegion((prevSelectedRegion) => {
                    return prevSelectedRegion && prevSelectedRegion.feature.properties.id === feature.properties.id
                })

            } else if (mapDivision == 'division2') {
                setSelectRegion((prevSelectedRegion) => {
                    return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_2 === feature.properties.ID_2
                })
            } else {
                setSelectRegion((prevSelectedRegion) => {
                    return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_3 === feature.properties.ID_3
                        ? null
                        : layer
                })
            }
        })
    }

    const filteredRegions = () => {
        return data?.feature.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')
    }

    if (data) {
        const filteredData = { ...data, features: filteredRegions() }

        return (
            <GeoJSON
                data={filteredData}
                onEachFeature={onEachFeature}
                style={(feature) => setStyle(feature)}
            />
        )
    }
}

export default HeatMapLayer