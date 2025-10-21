import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserProfile } from "@/hooks/allGetQueries"
import { Building2, Calendar, Mail, Phone, User } from "lucide-react"
import EditSampleDrawer from "../../../components/shared/EditSampleDrawer"

const Account = () => {
  const { data: ispProfile, isLoading } = useUserProfile()

  if (isLoading) return <AccountSkeleton />

  const { isp_id, ispLogo, ispName, ownerName, phone, email, createdAt, updatedAt } = ispProfile || {}

  return (
    // @container/panel from parent DashboardLayout + @container/card for internal responsiveness
    <Card className="@container/card shadow-lg hover:shadow-xl mx-auto border-border/40 max-w-2xl overflow-hidden transition-all duration-300">
      {/* header with gradient */}
      <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background h-24 @sm/card:h-28 @md/card:h-32">
        <div className="absolute inset-0 bg-grid-white/5" />
      </div>

      {/* logo Section - overlapping header */}
      <CardHeader className="-mt-12 @sm/card:-mt-14 @md/card:-mt-16 pb-3 @md/card:pb-4">
        <div className="flex @md/card:flex-row flex-col items-start @md/card:items-end gap-4 @md/card:gap-6">
          {/* Logo */}
          <div className="group relative">
            <div className="bg-background shadow-xl border-4 border-background rounded-2xl size-24 @sm/card:size-28 overflow-hidden">
              {ispLogo ? (
                <img src={ispLogo} alt={`${ispName} Logo`} className="size-full object-cover" />
              ) : (
                <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-primary/5 size-full">
                  <Building2 className="size-10 @sm/card:size-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* ISP name & actions */}
          <div className="flex-1 @sm/card:pb-2 w-full">
            <div className="flex justify-between items-start gap-3 @sm/card:gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-xl @sm/card:text-2xl truncate tracking-tight">
                  {ispName}
                </h2>
                <p className="mt-1 text-muted-foreground text-xs @sm/card:text-sm">
                  ID: {isp_id}
                </p>
              </div>
              {/* <EditAccountDrawer ispLogo={ispLogo} ispName={ispName} /> */}
              <EditSampleDrawer
                title="Edit Account Details"
                subtitle="Need to update your ISP name or logo?"
                btnSize="sm"
                btnVariant="outline"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 @sm/card:space-y-6 pb-5 @sm/card:pb-6">
        {/* owner details section */}
        <div className="space-y-3 @sm/card:space-y-4">
          {/* headline */}
          <div className="flex justify-between items-center ml-1">
            <h3 className="font-semibold text-base @sm/card:text-lg">Owner Details</h3>
            <EditSampleDrawer />
          </div>

          {/* info grid */}
          <div className="gap-2 @sm/card:gap-2.5 grid ml-1">
            <InfoRow icon={User} label="Name" value={ownerName} />
            <InfoRow icon={Phone} label="Phone" value={phone} />
            <InfoRow icon={Mail} label="Email" value={email} />
          </div>
        </div>

        {/* timestamps */}
        {(createdAt || updatedAt) && (
          <>
            <div className="bg-border h-px" />
            <div className="flex @xs/card:flex-row flex-col items-start @xs/card:items-center gap-2 @xs/card:gap-6 ml-1 text-muted-foreground text-xs">
              {createdAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>Created {new Date(createdAt).toLocaleDateString()}</span>
                </div>
              )}
              {updatedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>Updated {new Date(updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// reusable info row
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center gap-2 @sm/card:gap-3 text-xs @sm/card:text-sm">
    <div className="flex justify-center items-center bg-muted/50 group-hover:bg-primary/15 rounded-lg size-7 @sm/card:size-8 transition-colors shrink-0">
      <Icon className="size-3.5 @sm/card:size-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={2.5} />
    </div>
    <dt className="min-w-10 @sm/card:min-w-12 text-muted-foreground group-hover:text-primary/85 transition-colors">
      {label}
    </dt>
    <dd className="flex-1 font-medium truncate">{value || "—"}</dd>
  </div>
)

// skeleton
const AccountSkeleton = () => (
  <Card className="@container/card mx-auto border-border/40 max-w-2xl overflow-hidden">
    {/* gradient header */}
    <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background h-24 @sm/card:h-28 @md/card:h-32" />

    {/* logo & header section */}
    <CardHeader className="-mt-12 @sm/card:-mt-14 @md/card:-mt-16 pb-3 @md/card:pb-4">
      <div className="flex @sm/card:flex-row flex-col items-start @sm/card:items-end gap-4 @sm/card:gap-6">
        {/* logo skeleton */}
        <Skeleton className="rounded-2xl size-24 @sm/card:size-28 shrink-0" />

        {/* info skeleton */}
        <div className="flex-1 space-y-2 @sm/card:pb-2 w-full">
          <Skeleton className="w-40 @sm/card:w-48 h-6 @sm/card:h-8" />
          <Skeleton className="w-24 @sm/card:w-32 h-3 @sm/card:h-4" />
        </div>
      </div>
    </CardHeader>

    <CardContent className="space-y-4 @sm/card:space-y-6 pb-5 @sm/card:pb-6">
      {/* owner details */}
      <div className="ml-1">
        <Skeleton className="w-32 @sm/card:w-40 h-5 @sm/card:h-6" />
      </div>

      {/* info rows skeleton */}
      <div className="space-y-2 @sm/card:space-y-2.5 ml-1">
        <InfoRowSkeleton />
        <InfoRowSkeleton />
        <InfoRowSkeleton />
      </div>

      {/* timestamps skeleton */}
      <div className="bg-border h-px" />
      <div className="flex @xs/card:flex-row flex-col gap-2 @xs/card:gap-6 ml-1">
        <Skeleton className="w-32 h-3" />
        <Skeleton className="w-32 h-3" />
      </div>
    </CardContent>
  </Card>
)

// info row skeleton
const InfoRowSkeleton = () => (
  <div className="flex items-center gap-2 @sm/card:gap-3">
    <Skeleton className="rounded-lg size-7 @sm/card:size-8 shrink-0" />
    <Skeleton className="w-full max-w-xs h-4 @sm/card:h-5" />
  </div>
)

export default Account