import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, LocateIcon } from "lucide-react";

const MapDialog = ({ latitude, longitude, children }) => {
  const isValidCoordinates = latitude && longitude &&
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  const mapsUrl = isValidCoordinates
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button size="xs" variant="">
            <LocateIcon className="size-4" /> Location
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 w-full max-w-md">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Location</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {isValidCoordinates ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Latitude: {latitude}</p>
                <p className="text-muted-foreground text-sm">Longitude: {longitude}</p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="gap-2 w-full">
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <div className="text-muted-foreground text-sm text-center">
                Click above to view location on Google Maps
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center bg-muted rounded-lg w-full h-32">
              <p className="text-muted-foreground">
                {latitude && longitude
                  ? "Invalid coordinates"
                  : "Coordinates not provided"}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;