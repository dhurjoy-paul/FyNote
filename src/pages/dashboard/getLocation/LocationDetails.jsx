const accuracyColor = (m) => {
  if (m <= 10) return "text-green-500"
  if (m <= 30) return "text-yellow-500"
  return "text-red-500"
}

export const LocationDetails = ({ initialLocation, refinedLocation, address }) => {
  return (
    <div className="gap-4 grid md:grid-cols-2 p-4 border rounded-lg">
      <div>
        <h3 className="mb-1 font-medium text-sm">Initial GPS Reading</h3>
        <p className="font-mono text-sm">
          {initialLocation.lat.toFixed(6)}, {initialLocation.lng.toFixed(6)}
        </p>
        <p className={`text-xs font-semibold ${accuracyColor(initialLocation.accuracy)}`}>
          ±{initialLocation.accuracy.toFixed(1)}m
        </p>
      </div>
      <div>
        <h3 className="mb-1 font-medium text-sm">User Refined Location</h3>
        <p className="font-mono text-sm">
          {refinedLocation.lat.toFixed(6)}, {refinedLocation.lng.toFixed(6)}
        </p>
        <p className="text-muted-foreground text-xs">Final value to save</p>
      </div>
      <div className="md:col-span-2">
        <p className="text-muted-foreground text-xs">Address: {address || "…"}</p>
      </div>
    </div>
  )
}