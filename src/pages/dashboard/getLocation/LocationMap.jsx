import { useMemo, useRef } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

export const LocationMap = ({ center, markerPosition, onMarkerDragEnd }) => {
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          onMarkerDragEnd(marker.getLatLng())
        }
      },
    }),
    [onMarkerDragEnd]
  )

  return (
    <div className="rounded-lg h-96 overflow-hidden">
      <MapContainer center={center} zoom={17} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          draggable={true}
          position={markerPosition}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Drag this pin to refine your location.</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}