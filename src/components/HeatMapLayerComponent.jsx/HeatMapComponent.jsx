import { useContext, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import {
  selectedStyle,
  defaultStyle,
} from "./Style";
import { CollectionContext } from "../../context/collection";
// import usePopulationData from "../../hooks/usePopulationData";
// import { getPublicCollections } from "../../services/collectionService";

const HeatMapLayer = ({
  mapDivision,
  onRegionSelected,
  districtName,
  lifeQuality,
}) => {
  const { collection } = useContext(CollectionContext);
  const data = useGeoJsonData(mapDivision);
  console.log(data);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    setSelectedRegion(null);
  }, [mapDivision]);

  const setStyle = (feature) => {
    const currentGroupId = feature.properties.ID_3;
    const currentDistrict = feature.properties.NAME_3;
    if (
      (selectedRegion &&
        selectedRegion.feature.properties.ID_3 === currentGroupId) ||
      (districtName && districtName === currentDistrict)
    ) {
      return selectedStyle;
    } else {
      return defaultStyle;
    }
  };

  const onEachFeature = (feature, layer) => {
    //console.log({feature, layer})
    layer.on("click", () => {
      // console.log(feature.properties)
      if (mapDivision == "country") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_0 ===
              feature.properties.ID_0
            ? null
            : layer;
        });
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_0);
        }
      } else if (mapDivision == "division1") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.id === feature.properties.id
            ? null
            : layer;
        });
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_1);
        }
      } else if (mapDivision == "division2") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_2 ===
              feature.properties.ID_2
            ? null
            : layer;
        });
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_2);
        }
      } else {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_3 ===
              feature.properties.ID_3
            ? null
            : layer;
        });
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_3);
        }
      }
    });
  };

  const filteredRegions = (regionName) => {
    return data?.features.filter(
      (region) => region.properties.NAME_1 === regionName
    );
  };

  if (data) {
    let filteredLifeQualityCompanies = [];
    const filteredData = {
      ...data,
      features: filteredRegions("Baden-Württemberg"),
    };

    //cogemos las compañias por lifeQuality
    let regions = []
    if (collection[0] && collection[0].data && lifeQuality) {
      filteredLifeQualityCompanies = collection[0].data.filter((company) => {
        if (lifeQuality === company.lifeQuality) {
          return true;
        }
        return false;
      });
      //sacamos las regiones de las compañias que cogimos por lifeQuality
      const regionsFilteredByLifeQuality = filteredLifeQualityCompanies.map(
        (company) => {
          return company.districtName;
        }
      );
      //quitamos las regiones duplicadas
      const regionsFilteredByLifeQualityWithoutDuplicates = [
        ...new Set(regionsFilteredByLifeQuality),
      ];

      //cogemos las features de las regiones que hemos filtrado
      regions = data.features.filter((region) => {
        if (
          regionsFilteredByLifeQualityWithoutDuplicates.includes(
            region.properties.NAME_3
          )
        ) {
          return true
        }
        return false
      });
    }
    //cambio en data = a region en vez de FilteredData para probar, pero tiene que ser dinamico para que sirva con todo 
    return (
      <GeoJSON
        data={regions}
        onEachFeature={onEachFeature}
        style={(feature) => setStyle(feature)}
      />
    );
  } else {
    return null;
  }
};

export default HeatMapLayer;
