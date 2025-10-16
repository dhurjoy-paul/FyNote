import { Card } from "@/components/ui/card";
import { usePackages } from "@/hooks/allHooks";
import { LuPackagePlus } from "react-icons/lu";
import PackageCard from "./PackageCard";

const Packages = () => {
  const {
    data: packages,
    isLoading,
    error,
    refetch,
    isRefetching
  } = usePackages();

  console.log(packages)

  // @container/panel coming from DashboardLayout.jsx > Outlet wrapper div
  return (
    <div className="gap-6 grid grid-cols-1 @[454px]/panel:grid-cols-2 @2xl/panel:grid-cols-3 @5xl/panel:grid-cols-4 @7xl/panel:grid-cols-5">

      {/* add package card */}
      <Card className={`@container/card flex items-center justify-center dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out text-muted-foreground border-dashed border-1 border-muted-foreground cursor-pointer select-none group hover:border-primary/80`}
      >
        <LuPackagePlus className="group-hover:text-primary/90 text-4xl @[454px]/panel:text-5xl transition-all duration-200 ease-in-out"/>
        <p className="mb-3 @[454px]/panel:mb-0 font-semibold group-hover:text-primary/90 text-lg @[454px]/panel:text-xl leading-0 transition-all duration-200 ease-in-out">Add Package</p>
      </Card>

      {/* all packages */}
      {
        packages && packages.map((pkg) => (
          <PackageCard key={pkg.package_id} card={pkg} />
        ))
      }
    </div>
  )
}
export default Packages