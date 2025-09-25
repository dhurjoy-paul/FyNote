import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import L from "leaflet"
import { Loader2 } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function LocationAccuracyTester() {
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)
  const [initialLocation, setInitialLocation] = useState(null)
  const [refinedLocation, setRefinedLocation] = useState(null)
  const [address, setAddress] = useState(null)
  const markerRef = useRef(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error")
      setError("Geolocation not supported in this browser.")
      return
    }
    setStatus("loading")
    setError(null)

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const handleSuccess = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords
    const locationData = { lat: latitude, lng: longitude, accuracy }
    setInitialLocation(locationData)
    setRefinedLocation(locationData)
    setStatus("success")
    fetchAddress(latitude, longitude)
  }

  const handleError = (err) => {
    let msg = "Unknown error"
    if (err.code === err.PERMISSION_DENIED) msg = "Permission denied."
    if (err.code === err.POSITION_UNAVAILABLE) msg = "Position unavailable."
    if (err.code === err.TIMEOUT) msg = "Location request timed out."
    setError(msg)
    setStatus("error")
  }

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
      const json = await res.json()
      setAddress(json.display_name || "No address found")
    } catch (e) {
      setAddress("Cannot fetch address")
    }
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          const { lat, lng } = marker.getLatLng()
          setRefinedLocation({ ...refinedLocation, lat, lng })
          fetchAddress(lat, lng)
        }
      },
    }),
    [refinedLocation]
  )

  const accuracyColor = (m) => {
    if (m <= 10) return "text-green-500"
    if (m <= 30) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="mx-auto max-w-6xl">
      <CardHeader className="flex sm:flex-row flex-col sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h3 className="font-semibold text-lg">Location Accuracy Test</h3>
          <p className="text-muted-foreground text-sm">
            Uses your device GPS for precise pin location, with manual refinement
            option.
          </p>
        </div>
        <Button onClick={getLocation} disabled={status === "loading"}>
          {status === "loading" && (<Loader2 className="mr-2 w-4 h-4 animate-spin" />)}
          Pinpoint Location
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "error" && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status === "loading" && <Skeleton className="w-full h-40" />}

        {status === "success" && initialLocation && (
          <div className="space-y-4">
            <div className="gap-4 grid md:grid-cols-2 p-4 border rounded-lg">
              <div>
                <h3 className="mb-1 font-medium text-sm">Initial GPS Reading</h3>
                <p className="font-mono text-sm">
                  {initialLocation.lat.toFixed(6)},{" "}
                  {initialLocation.lng.toFixed(6)}
                </p>
                <p className={`text-xs font-semibold ${accuracyColor(initialLocation.accuracy)}`}>
                  ±{initialLocation.accuracy.toFixed(1)}m
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-sm">
                  User Refined Location
                </h3>
                <p className="font-mono text-sm">
                  {refinedLocation.lat.toFixed(6)},{" "}
                  {refinedLocation.lng.toFixed(6)}
                </p>
                <p className="text-muted-foreground text-xs">
                  Final value to save
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground text-xs">
                  Address: {address || "…"}
                </p>
              </div>
            </div>

            <div className="rounded-lg h-96 overflow-hidden">
              <MapContainer
                center={[initialLocation.lat, initialLocation.lng]}
                zoom={17}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  draggable={true}
                  position={[refinedLocation.lat, refinedLocation.lng]}
                  eventHandlers={eventHandlers}
                  ref={markerRef}
                >
                  <Popup>Drag this pin to refine.</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}