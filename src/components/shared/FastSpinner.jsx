import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

export function FastSpinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}