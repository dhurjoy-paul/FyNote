import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const PackageCardSkeleton = () => (
  <Card className="@container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs">
    <CardHeader>
      <Skeleton className="w-32 @[250px]/card:w-40 h-5 @[250px]/card:h-6" />
    </CardHeader>

    <CardContent className="gap-2 grid grid-cols-[1fr_1fr_max-content] @[454px]/panel:grid-cols-2">
      {/* Bandwidth section */}
      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-16 @[250px]/card:w-20 h-6 @[250px]/card:h-8" />
      </div>

      {/* Price section */}
      <div className="space-y-2">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 @[250px]/card:w-20 h-7 @[250px]/card:h-8" />
      </div>

      {/* Action buttons */}
      <div className="flex @[454px]/panel:flex-row flex-col gap-2 @[454px]/panel:mt-5">
        <Skeleton className="rounded-md size-9" />
        <Skeleton className="rounded-md size-9" />
      </div>
    </CardContent>
  </Card>
)
export default PackageCardSkeleton