import { FastSpinner } from "@/components/shared/FastSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useClientDetails, usePackageDetails, useUserProfile } from "@/hooks/allGetQueries";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router";
import ClientInfo from "./ClientInfo";
import ClientNote from "./ClientNote";
import PackageInfo from "./PackageInfo";

const ClientDetails = () => {
  const { idFrParam } = useParams();

  // fetching ISP profile for ispId
  const { data: ispProfile, isLoading: isLoadingProfile, isError: isErrorProfile } = useUserProfile();
  const { isp_id: ispId } = ispProfile || {};

  // fetching client details when have ispId and idFrParam
  const { data: client, isLoading: isLoadingClient, isError: isErrorClient } = useClientDetails(idFrParam, {
    enabled: !!ispId && !!idFrParam,
  });

  // client data object
  const { isp_id: ispIdFrClt, customer_id, name, autoName, package_id, phone, manualLocation, isPaid, isDue, isOff, image, note, gMapLattitude, gMapLongitude, clientAddedDate } = client || {};
  const customerName = name || `Customer ${customer_id}` || autoName || 'No Name';

  // fetching package if have package_id
  const { data: packageDetails, isLoading: isLoadingPackage } = usePackageDetails(package_id, {
    enabled: !!package_id,
  });

  // package object
  const { name: nameFrPkg, autoName: autoNameFrPkg, package_id: pkgIdFrPkg, bandwidth, price } = packageDetails || {};
  const packageName = nameFrPkg || `Package ${pkgIdFrPkg}` || autoNameFrPkg || 'No Package';

  // determine client status
  const getClientStatus = () => {
    if (isPaid) return { label: 'Paid', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100' };
    if (isDue) return { label: 'Due', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100' };
    if (isOff) return { label: 'Off', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100' };
    return { label: 'Unknown', color: '' };
  };

  const status = getClientStatus();

  // error states
  if (isErrorProfile || isErrorClient) {
    return (
      <div className="mx-auto py-8 container">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <p className="font-semibold text-destructive">Failed to load data</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // loading state
  const isLoading = isLoadingProfile || isLoadingClient;

  if (isLoading) {
    return (
      <div className="mx-auto py-8 container">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3">
              <FastSpinner className="size-8" />
              <p className="text-muted-foreground">Loading client details...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // authorization check
  if (ispId !== ispIdFrClt) {
    return (
      <div className="mx-auto py-8 container">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <p className="font-semibold text-destructive text-lg">Access Denied</p>
              <p className="text-muted-foreground">This is not your client</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // render Bento Grid Layout
  return (
    <div className="@container/details mx-auto container">
      {/* Bento Grid Layout */}
      <div className="gap-6 grid grid-cols-1 @2xl/details:grid-cols-2 @7xl/details:grid-cols-3">

        <ClientInfo
          customerId={customer_id}
          customerName={customerName}
          phone={phone}
          manualLocation={manualLocation}
          image={image}
          status={status}
          clientAddedDate={clientAddedDate}
          latitude={gMapLattitude}
          longitude={gMapLongitude}
        />

        <PackageInfo
          className="col-span-1"
          packageName={packageName}
          bandwidth={bandwidth}
          price={price}
          hasPackage={!!package_id}
          isLoading={isLoadingPackage}
          customerId={customer_id}
        />

        <ClientNote note={note} customerId={customer_id} />
      </div>
    </div>
  );
};

export default ClientDetails;