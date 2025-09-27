import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export const LocationInput = ({ onUrlParse }) => {
  const [url, setUrl] = useState("")
  const [error, setError] = useState(null)

  const handleParse = () => {
    setError(null)
    if (!url) {
      setError("Please paste a URL first.")
      return
    }
    const success = onUrlParse(url)
    if (success) {
      setUrl("")
    } else {
      setError("Could not find coordinates in the URL. Please use a valid Google Maps URL.")
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="location-url" className="font-medium text-sm">
        Paste Google Maps URL
      </label>
      <div className="flex sm:flex-row flex-col gap-3 mt-2">
        <Input
          id="location-url"
          type="url"
          placeholder="https://www.google.com/maps/place/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleParse}>Set Location</Button>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  )
}