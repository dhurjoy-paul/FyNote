import { usePackages } from "@/hooks/allGetQueries";
import AddPackageDrawer from "./AddPackageDrawer";
import PackageCard from "./PackageCard";

const Packages = () => {
  const { data: packages, isLoading, refetch, } = usePackages();

  if (isLoading) {
    return <p>Loading packages...</p>;
  }

  // @container/panel coming from DashboardLayout.jsx > Outlet wrapper div
  return (
    <div className="gap-6 grid grid-cols-1 @[454px]/panel:grid-cols-2 @2xl/panel:grid-cols-3 @5xl/panel:grid-cols-4 @7xl/panel:grid-cols-5">

      {/* add package card */}
      <AddPackageDrawer refetch={refetch} />

      {/* all packages */}
      {
        packages && packages.map((pkg) => (
          <PackageCard key={pkg.package_id} card={pkg} refetch={refetch} />
        ))
      }
    </div>
  )
}
export default Packages