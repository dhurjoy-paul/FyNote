import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPhoneDisplay } from "@/lib/phoneValidation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDaysIcon, Edit2Icon, MapPinIcon, PhoneIcon } from "lucide-react";
import MapDialog from "./MapDialog";


const InfoRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <p className="flex justify-center items-center bg-primary/10 rounded-md size-8 text-primary shrink-0">
          <Icon strokeWidth={2.5} className="bg-primary/10 rounded-md size-4 text-primary" />
        </p>
        <span className="mb-0.5 font-medium text-muted-foreground text-sm uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="ml-1 font-medium text-foreground/90">
        {value}
      </p>
    </div>
  )
}

const ClientInfo = ({ customerId, customerName, phone, manualLocation, image, status, clientAddedDate, latitude, longitude }) => {
  const handleEdit = () => {
    console.log('Edit client info for customer:', customerId);
  };

  const formattedDate = clientAddedDate
    ? format(new Date(clientAddedDate), 'dd MMM yyyy')
    : 'N/A';

  const formattedPhone = formatPhoneDisplay(phone)

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CL'
  };

  return (
    <Card className="@container/panel group dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md h-full transition-all duration-200 ease-in-out">
      <CardContent className="flex flex-col justify-around gap-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="ring-2 ring-primary/10 group-hover:ring-primary/20 size-16 @lg/panel:size-24 transition-all duration-200 ease-in-out">
              <AvatarImage src={image} alt={customerName} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 font-semibold text-primary text-lg">
                {getInitials(customerName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="mb-2 font-semibold text-foreground text-base @lg/panel:text-2xl truncate leading-tight">
                {customerName}
              </h3>
              <Badge
                variant={status?.variant || "secondary"}
                className={cn("px-2.5 py-0.5 font-medium text-sm", status.color)}
              >
                <span className="inline-block bg-current mr-1.5 rounded-full size-1.5 animate-pulse"></span>
                {status?.label || ''}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <Button
              size="xs"
              variant="default"
              onClick={handleEdit}
              className="w-full"
            // className="hover:bg-primary/10 opacity-60 hover:opacity-100 group-hover:opacity-100 w-full hover:text-primary transition-all duration-200 ease-in-out"
            >
              <Edit2Icon className="size-4" />Edit
            </Button>
            <MapDialog latitude={latitude} longitude={longitude} />
          </div>
        </div>

        <div className="gap-6 grid grid-cols-2">
          {formattedPhone && <a href={`tel:${phone}`} className="hover:bg-primary/5 rounded-lg"><InfoRow icon={PhoneIcon} label='Phone' value={formattedPhone} /></a>}
          {formattedDate && <InfoRow icon={CalendarDaysIcon} label='Client Since' value={formattedDate} />}
          {manualLocation && <InfoRow icon={MapPinIcon} label='Location' value={manualLocation} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;