import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export const ErrorAlert = ({ message }) => (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)

export const LoadingSkeleton = () => <Skeleton className="w-full h-40" />
