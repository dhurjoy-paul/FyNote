import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ErrorAlert, LoadingSkeleton } from "./common"
import "./leaflet-config"
import { LocationDetails } from "./LocationDetails"
import { LocationInput } from "./LocationInput"
import { LocationMap } from "./LocationMap"
import { TesterHeader } from "./TesterHeader"
import { useLocationAccuracy } from "./useLocationAccuracy"

export default function LocationAccuracyTester() {
  const {
    status,
    error,
    initialLocation,
    refinedLocation,
    address,
    getLocation,
    handleMarkerDragEnd,
    setLocationFromUrl,
  } = useLocationAccuracy()

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <LoadingSkeleton />
      case "error":
        return <ErrorAlert message={error} />
      case "success":
        if (!refinedLocation) {
          return null
        }

        return (
          <div className="space-y-4">
            <LocationDetails
              initialLocation={initialLocation}
              refinedLocation={refinedLocation}
              address={address}
            />
            <LocationMap
              center={[refinedLocation.lat, refinedLocation.lng]}
              markerPosition={[refinedLocation.lat, refinedLocation.lng]}
              onMarkerDragEnd={handleMarkerDragEnd}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="mx-auto max-w-6xl">
      <CardHeader>
        <TesterHeader onGetLocation={getLocation} isLoading={status === "loading"} />
      </CardHeader>
      <CardContent className="space-y-4">
        <LocationInput onUrlParse={setLocationFromUrl} />
        {renderContent()}
      </CardContent>
    </Card>
  )
}