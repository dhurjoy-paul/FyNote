import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ImageIcon } from "lucide-react";

const ClientImage = ({ image, customerName, customerId }) => {
  const hasImage = image && image !== 'nai' && image !== 'null';

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit image for customer:', customerId);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle className="text-base">Client Photo</CardTitle>
        <Button size="sm" variant="outline" onClick={handleEdit}>
          <Edit className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {hasImage ? (
          <div className="relative border rounded-lg aspect-square overflow-hidden">
            <img
              src={image}
              alt={customerName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-muted border-2 border-dashed rounded-lg aspect-square">
            <ImageIcon className="mb-2 w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No photo available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientImage;