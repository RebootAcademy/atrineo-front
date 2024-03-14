import { useState, useContext } from "react"

import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/input"
import { Label } from "@/components/ui/Label/Label"

import LoadingButton from "@/components/LoadingButton/LoadingButton"

import { CollectionContext } from "@/context/collectionContext"
import { updateCollection } from "@/services/collectionService"



function LatitudeLongitudeComponent() {
  const { collection, setCollection } = useContext(CollectionContext)
  const [latitude, setLatitude] = useState(collection?.latitude)
  const [longitude, setLongitude] = useState(collection?.longitude)
  const [ loading, setLoading ] = useState(false)

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value)
  }

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value)
  }

  const handleLatLonUpdate = async () => {
    setLoading(true)
    setCollection(prevCollection => ({
      ...prevCollection,
      latitude: latitude !== "" ? parseFloat(latitude) : prevCollection.latitude,
      longitude: longitude !== "" ? parseFloat(longitude) : prevCollection.longitude
    }))
    await updateCollection(collection._id, latitude, longitude)
    setLoading(false)
  }

  return (
    <>
      <div className="flex items-center justify-center my-4">
        <Label className="mr-2">Latitude:</Label>
        <Input
          className="w-16"
          value={latitude}
          onChange={handleLatitudeChange}
        />
        <Label className="mr-2 ml-2">Longitude:</Label>
        <Input
          className="w-16"
          value={longitude}
          onChange={handleLongitudeChange}
        />
        {
          loading ? 
            <LoadingButton /> :
            <Button
              className="ml-2"
              onClick={handleLatLonUpdate}
            >
              Update
            </Button>
        }
      </div>
    </>
  )
}

export default LatitudeLongitudeComponent