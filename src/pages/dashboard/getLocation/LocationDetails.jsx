import CopyButton from "@/components/shared/CopyButton"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const accuracyColor = (m) => {
  if (m <= 10) return "text-green-500"
  if (m <= 30) return "text-yellow-500"
  return "text-red-500"
}

export const LocationDetails = ({ initialLocation, refinedLocation, address }) => {
  const refinedCoords = `${refinedLocation.lat.toFixed(6)}, ${refinedLocation.lng.toFixed(6)}`
  const googleMapsUrl = `https://www.google.com/maps?q=${refinedCoords}`

  return (
    <div className="space-y-4 mt-12">
      <div className="gap-6 grid md:grid-cols-2">
        {initialLocation && (
          <div className="space-y-1">
            <h3 className="font-medium text-sm">Initial GPS Reading</h3>
            <p className="font-mono text-sm">
              {initialLocation.lat.toFixed(6)}, {initialLocation.lng.toFixed(6)}
            </p>
            <p className={`text-xs font-semibold ${accuracyColor(initialLocation.accuracy)}`}>
              ±{initialLocation.accuracy.toFixed(1)}m
            </p>
          </div>
        )}

        <div className={!initialLocation ? "md:col-span-2" : ""}>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">
                {initialLocation ? "User Refined Location" : "Location"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{refinedCoords}</span>
                <CopyButton textToCopy={refinedCoords} />
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="flex-shrink-0">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Map
                <ExternalLink className="ml-1.5 w-3 h-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-muted/20 p-4 border rounded-lg">
        <p className="flex-grow text-muted-foreground text-sm">
          <span className="font-medium text-primary">Address:</span> {address || "…"}
        </p>
        {address && <CopyButton textToCopy={address} />}
      </div>
    </div>
  )
}