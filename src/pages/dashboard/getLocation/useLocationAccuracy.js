import { useCallback, useState } from "react"

export function useLocationAccuracy() {
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)
  const [initialLocation, setInitialLocation] = useState(null)
  const [refinedLocation, setRefinedLocation] = useState(null)
  const [address, setAddress] = useState(null)

  const fetchAddress = useCallback(async (lat, lng) => {
    setAddress("Fetching address…")
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      if (!res.ok) throw new Error("Failed to fetch address")
      const json = await res.json()
      setAddress(json.display_name || "No address found for this location.")
    } catch (e) {
      setAddress("Could not fetch address.")
    }
  }, [])

  const handleSuccess = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords
    const locationData = { lat: latitude, lng: longitude, accuracy }
    setInitialLocation(locationData)
    setRefinedLocation(locationData)
    setStatus("success")
    fetchAddress(latitude, longitude)
  }

  const handleError = (err) => {
    let msg = "An unknown error occurred."
    if (err.code === err.PERMISSION_DENIED) msg = "Geolocation permission was denied."
    if (err.code === err.POSITION_UNAVAILABLE) msg = "Location information is unavailable."
    if (err.code === err.TIMEOUT) msg = "The request to get user location timed out."
    setError(msg)
    setStatus("error")
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error")
      setError("Geolocation is not supported by your browser.")
      return
    }
    setStatus("loading")
    setError(null)
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    })
  }

  const handleMarkerDragEnd = useCallback((newLatLng) => {
    setRefinedLocation(prev => ({ ...(prev || {}), ...newLatLng }))
    fetchAddress(newLatLng.lat, newLatLng.lng)
  }, [fetchAddress])

  const setLocationFromUrl = useCallback((url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
    const match = url.match(regex)

    if (match && match.length >= 3) {
      const lat = parseFloat(match[1])
      const lng = parseFloat(match[2])
      const locationData = { lat, lng, accuracy: 0 }

      setInitialLocation(null)
      setRefinedLocation(locationData)
      setStatus("success")
      setError(null)
      fetchAddress(lat, lng)
      return true
    }
    return false
  }, [fetchAddress])

  return {
    status,
    error,
    initialLocation,
    refinedLocation,
    address,
    getLocation,
    handleMarkerDragEnd,
    setLocationFromUrl
  }
}