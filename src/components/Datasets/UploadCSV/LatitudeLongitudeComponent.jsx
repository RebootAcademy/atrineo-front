import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/input"
import { Label } from "@/components/ui/Label/Label"
import { useState, useContext } from "react"
import { CollectionContext } from "@/context/collectionContext"
import { updateCollection } from "@/services/collectionService"

function LatitudeLongitudeComponent() {
  const { collection, setCollection } = useContext(CollectionContext)
  const [latitude, setLatitude] = useState(collection?.latitude)
  const [longitude, setLongitude] = useState(collection?.longitude)

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