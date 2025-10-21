import { usePackages } from "@/hooks/allGetQueries";
import AddPackageDrawer from "./AddPackageDrawer";
import PackageCard from "./PackageCard";
import PackageCardSkeleton from "./PackageCardSkeleton";

const Packages = () => {
  const { data: packages = [], isLoading } = usePackages();

  // @container/panel coming from DashboardLayout.jsx > Outlet wrapper div
  return (
    <div className="gap-6 grid grid-cols-1 @[454px]/panel:grid-cols-2 @2xl/panel:grid-cols-3 @5xl/panel:grid-cols-4 @7xl/panel:grid-cols-5">

      {/* add package card */}
      <AddPackageDrawer />

      {/* skeletons while loading */}
      {isLoading && Array.from({ length: 5 }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}

      {/* all packages */}
      {
        !isLoading && packages.map((pkg) => (
          <PackageCard key={pkg.package_id} card={pkg} />
        ))
      }
    </div>
  )
}
export default Packages