import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/input"
import { Label } from "@/components/ui/Label/Label"
import { useState, useContext } from "react"
import { CollectionContext } from "@/context/collectionContext"

function LatitudeLongitudeComponent() {
  const [latitude, setLatitude] = useState("")
  console.log(latitude)
  const [longitude, setLongitude] = useState("")
  console.log(longitude)
  const { collection, setCollection } = useContext(CollectionContext)
  console.log(collection.latitude)
  console.log(collection.longitude)

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value)
  }

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value)
  }

  const handleLatLonUpdate = () => {
    setCollection(prevCollection => ({
      ...prevCollection,
      latitude: latitude !== "" ? parseFloat(latitude) : prevCollection.latitude,
      longitude: longitude !== "" ? parseFloat(longitude) : prevCollection.longitude
    }))
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <Label className="mr-2">Latitude:</Label>
        <Input 
          value={latitude}
          onChange={handleLatitudeChange}
        />
        <Label className="mr-2 ml-2">Longitude:</Label>
        <Input 
          value={longitude}
          onChange={handleLongitudeChange}
        />
        <Button 
          className="ml-2"
          onClick={handleLatLonUpdate}
        >Update</Button>
      </div>
    </>
  )
}

export default LatitudeLongitudeComponent