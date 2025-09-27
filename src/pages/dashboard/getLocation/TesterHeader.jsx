import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export const TesterHeader = ({ onGetLocation, isLoading }) => {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <div>
        <h3 className="font-semibold text-lg">Location Accuracy Test</h3>
        <p className="text-muted-foreground text-sm">
          Uses your device's GPS for precise pin location, with manual refinement.
        </p>
      </div>
      <Button onClick={onGetLocation} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
        Pinpoint Location
      </Button>
    </div>
  )
}