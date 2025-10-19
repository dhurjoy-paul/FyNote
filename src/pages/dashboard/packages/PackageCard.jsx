import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/utils/api";
import { Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";
import EditPackageDrawer from "./EditPackageDrawer";

const PackageCard = ({ card, refetch }) => {
  const { isp_id, package_id, name, autoName, bandwidth, price } = card;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      text: `"${name ? name : autoName ? autoName : `Package #${package_id}`}" will be deleted permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          api.delete(`/package/${package_id}`); // use Tanstack Query mutation

          Swal.fire({
            title: "Deleted!",
            text: '"' + name + '" (' + autoName + ") has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.log(error)
        } finally {
          refetch();
        }
      }
    });
    refetch();  // fix the issue of not updating the UI after deletion
  }

  return (
    <Card
      className={`@container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out`}
    >
      <CardHeader>
        <CardTitle className="font-normal tabular-nums text-base @[250px]/card:text-xl">
          {name ? name : autoName ? autoName : `Package #${package_id}`}
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-2 grid grid-cols-[1fr_1fr_max-content] @[454px]/panel:grid-cols-2">
        <div>
          <CardDescription >Bandwidth</CardDescription>
          <p>
            <span className="font-semibold text-xl @[250px]/card:text-3xl">{bandwidth} </span>
            <span>Mbps</span>
          </p>
        </div>
        <div>
          <CardDescription >Price</CardDescription>
          <p>
            <span className="font-semibold text-2xl @[250px]/card:text-3xl">{price} </span>
            <span>tk</span>
          </p>
        </div>
        <div className="flex @[454px]/panel:flex-row flex-col gap-2 @[454px]/panel:mt-5 @self-end">
          <EditPackageDrawer card={card} refetch={refetch} />
          <Button onClick={handleDelete} variant="destructive" size="sm" className="w-full transition-all duration-200 ease-in-out cursor-pointer"><Trash2Icon /></Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default PackageCard