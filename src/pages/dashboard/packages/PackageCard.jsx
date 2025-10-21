import { FastSpinner } from "@/components/shared/FastSpinner";
import { ToastFailed, ToastSuccess } from "@/components/shared/ToastMassage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePackage } from "@/hooks/allDeleteQueries";
import { Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";
import EditPackageDrawer from "./EditPackageDrawer";

const PackageCard = ({ card }) => {
  const { mutate: deletePackage, isPending: isDeleting } = useDeletePackage();
  const { isp_id, package_id, name, autoName, bandwidth, price } = card;
  const packageName = name || autoName || `Package #${package_id}`;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `"${packageName}" will be deleted permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deletePackage(package_id);
          ToastSuccess(`Package "${packageName}" deleted successfully.`);
        } catch (err) {
          ToastFailed("Failed to delete the package.");
          console.log(err)
        }
      }
    });
  }

  if (isDeleting) {
    return (
      <Card className="flex justify-center items-center dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs min-h-[180px]">
        <FastSpinner className="size-8" />
      </Card>
    )
  }

  return (
    <Card
      className={`
        @container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card 
        shadow-xs hover:shadow-md transition-all duration-200 ease-in-out
        ${isDeleting ? 'opacity-60 pointer-events-none' : ''}
      `}
    >
      <CardHeader>
        <CardTitle className="font-normal tabular-nums text-base @[250px]/card:text-xl">
          {packageName}
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-2 grid grid-cols-[1fr_1fr_max-content] @[454px]/panel:grid-cols-2">
        <div>
          <CardDescription>Bandwidth</CardDescription>
          <p>
            <span className="font-semibold text-xl @[250px]/card:text-3xl">{bandwidth} </span>
            <span>Mbps</span>
          </p>
        </div>

        <div>
          <CardDescription>Price</CardDescription>
          <p>
            <span className="font-semibold text-2xl @[250px]/card:text-3xl">{price} </span>
            <span>tk</span>
          </p>
        </div>

        <div className="flex @[454px]/panel:flex-row flex-col gap-2 @[454px]/panel:mt-5">
          <EditPackageDrawer card={card} disabled={isDeleting} />

          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            className="w-full transition-all duration-200 ease-in-out"
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2Icon className="size-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default PackageCard;