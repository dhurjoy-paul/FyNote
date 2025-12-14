import { FastSpinner } from "@/components/shared/FastSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Package, PencilIcon } from "lucide-react";

const PackageInfo = ({ packageName, bandwidth, price, hasPackage, isLoading, customerId, className }) => {

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit package for customer:', customerId);
  };

  return (
    <Card className={cn(className, 'h-full @container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out')}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="size-4" />
          Package Details
        </CardTitle>
      </CardHeader>

      <Separator />
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <FastSpinner className="size-6" />
          </div>
        ) : hasPackage ? (
          <>
            <p className="font-normal tabular-nums text-base @[250px]/card:text-xl">
              {packageName}
            </p>

            <div className="gap-2 grid grid-cols-[1fr_1fr_max-content] @[454px]/panel:grid-cols-2 mt-4">
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
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-8 text-center">
            <Package className="mb-2 size-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No package assigned</p>
          </div>
        )}
      </CardContent>
      {
        (!isLoading && hasPackage) &&
        <>
          {/* <Separator /> */}
          <CardFooter className="mt-auto">
            <Button
              onClick={handleEdit}
              size="sm"
              className="flex justify-center items-center w-fit">
              <PencilIcon className="size-4" /> Edit
            </Button>
          </CardFooter>
        </>
      }
    </Card >
  );
};

export default PackageInfo;