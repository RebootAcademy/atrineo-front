import { Popup } from "react-leaflet"

export default function PopupComponent({ data }) {
  return (
    <Popup>
      <div className="text-sm">{data.name}</div>
    </Popup>
  )
}