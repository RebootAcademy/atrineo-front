// import { useEffect, useState } from "react"
// import getAtrineoCollectionAPI from "../services/atrineo"
// import { useContext } from "react";
// import { CollectionContext } from "../context/collection";
// import { useGeoJsonData } from "./useGeoJsonData";

// const usePopulationData = ({ mapDivision }) => {
//   const { collection } = useContext(CollectionContext)
//   console.log(collection)
//   const data = useGeoJsonData(mapDivision)

//   //aquí se define dos estados iniciales usando useState
//   const [groupedDataWithDivision3, setGroupedDataWithDivision3] = useState({});
//   const [groupedDataWithoutDivision3, setGroupedDataWithoutDivision3] = useState({});

//   //utiliza el useEffect para realizar operacions después de que el componente se haya renderizado
//   useEffect(() => {
//     //define una funcion async fetchData
//     const fetchData = async () => {
//       //llama a la function getAtrineoCollectionAPI para obtener datos
//       //getAtrineoCollectionAPI es una function importada desde services/atrineo
//       if (data) {
//         const result = await getAtrineoCollectionAPI()
//         //se verifica si los datos llegaron correctamente
//       } if (result) {
//         //inicializa dos objetos para almacenar datos agrupados con y sin division3
//         const groupedDataWith3 = {};
//         const groupedDataWithout3 = {};

//         //se itera sobre los datos obtenidos con la condición si existe o si no
//         result.collection.data.forEach((item) => {
//           const key = item.locationId.division3 ? item.locationId.division3.geojsonId : item.locationId.division1.geojsonId;
//           if (item.locationId.division3) {
//             groupedDataWith3[key] = groupedDataWith3[key] || { districts: [], totalPopulation: 0 };
//             groupedDataWith3[key].districts.push({ name: item.locationId.division4.name, population: item.districtPopulation });
//             groupedDataWith3[key].totalPopulation += item.districtPopulation;
//           } else {
//             groupedDataWithout3[key] = groupedDataWithout3[key] || { districts: [], totalPopulation: 0 };
//             groupedDataWithout3[key].districts.push({ name: item.locationId.division4.name, population: item.districtPopulation });
//             groupedDataWithout3[key].totalPopulation += item.districtPopulation;
//           }
//         });
//         //actualiza los estados conlos datos agrupados
//         setGroupedDataWithDivision3(groupedDataWith3);
//         setGroupedDataWithoutDivision3(groupedDataWithout3);
//       }
//     }
//     //llama a la función fetchData al hacer el componente (usando[])
//     fetchData()
//   }, [])
//   //este segundo argumentoa asegura que useEffect se ejecute solo una vez después del montaje
//   //devuelve los estados agrupados con y sin division3
//   return { groupedDataWithDivision3, groupedDataWithoutDivision3 };
// }

// export default usePopulationData
