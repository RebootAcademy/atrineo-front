import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/input"
import { Label } from "@/components/ui/Label/Label"
import { useState, useContext } from "react"
import { CollectionContext } from "@/context/collectionContext"
import { updateCollection } from "@/services/collectionService"

function LatitudeLongitudeComponent() {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const { collection, setCollection } = useContext(CollectionContext)

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value)
  }

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value)
  }

  const handleLatLonUpdate = async () => {
    setCollection(prevCollection => ({
      ...prevCollection,
      latitude: latitude !== "" ? parseFloat(latitude) : prevCollection.latitude,
      longitude: longitude !== "" ? parseFloat(longitude) : prevCollection.longitude
    }))
    await updateCollection(collection._id, latitude, longitude)
  }

  const handleKeyPress = (e) => {
    console.log(e.key)
    if (e.key == 'Enter') {
      handleLatLonUpdate()
    }
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
          onKeyDown={handleKeyPress}
        >Update</Button>
      </div>
    </>
  )
}

export default LatitudeLongitudeComponent