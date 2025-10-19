import { FastSpinner } from "@/components/shared/FastSpinner"
import { ToastFailed, ToastSuccess } from "@/components/shared/ToastMassage"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { useUpdatePackage } from "@/hooks/allPutQueries"
import { ALargeSmallIcon, BadgeTurkishLiraIcon, GaugeIcon, PencilIcon } from "lucide-react"
import { useState } from "react"

const EditPackageDrawer = ({ card }) => {
  const { mutate: editPackage } = useUpdatePackage();
  const { isp_id, package_id, name, bandwidth, price } = card

  const [open, setOpen] = useState(false)
  const [packageName, setPackageName] = useState(name || "")
  const [editBandwidth, setEditBandwidth] = useState(bandwidth || "")
  const [editPrice, setEditPrice] = useState(price || "")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen)
    if (isOpen) {
      setPackageName(name || "")
      setEditBandwidth(bandwidth || "")
      setEditPrice(price || "")
      setErrors({})
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!packageName.trim()) newErrors.packageName = "Package name is required."

    if (editBandwidth === "" || editBandwidth === null)
      newErrors.bandwidth = "Bandwidth is required."
    else if (isNaN(editBandwidth) || Number(editBandwidth) <= 0)
      newErrors.bandwidth = "Enter a valid positive number."
    else if (!/^\d+(\.\d+)?$/.test(String(editBandwidth)))
      newErrors.bandwidth = "Invalid number format."

    if (editPrice === "" || editPrice === null)
      newErrors.price = "Price is required."
    else if (isNaN(editPrice) || Number(editPrice) <= 0)
      newErrors.price = "Enter a valid positive price."
    else if (!/^\d+(\.\d+)?$/.test(String(editPrice)))
      newErrors.price = "Invalid number format."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEdit = () => {
    if (!validate()) {
      ToastFailed("Please fix the errors before submitting.")
      return
    }

    const packageData = {
      name: packageName.trim(),
      bandwidth: Number(editBandwidth),
      price: Number(editPrice),
    }

    setLoading(true)
    try {
      editPackage({ package_id, ...packageData });
      ToastSuccess("Package updated successfully!")
      setOpen(false)
    } catch (err) {
      ToastFailed("Failed to update package. Please try again.")
      console.error("EditPackage error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="w-full cursor-pointer">
          <PencilIcon /> Edit
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit Package</DrawerTitle>
            <DrawerDescription className="text-center">
              Modify details for "<span className="font-medium">{name}</span>".
            </DrawerDescription>
          </DrawerHeader>

          <div className="gap-6 grid w-full max-w-sm">
            {/* Package Name */}
            <div>
              <Label>Package Name</Label>
              <InputGroup className="group mt-2.5">
                <InputGroupInput
                  placeholder="Duronto BASIC"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
                <InputGroupAddon>
                  <ALargeSmallIcon
                    strokeWidth={2.5}
                    className="group-focus-within:text-primary"
                  />
                </InputGroupAddon>
              </InputGroup>
              {errors.packageName && (
                <p className="mt-1 text-destructive text-sm">
                  {errors.packageName}
                </p>
              )}
            </div>

            {/* Bandwidth */}
            <div>
              <Label>Network Bandwidth</Label>
              <InputGroup className="group mt-2.5">
                <InputGroupInput
                  type="number"
                  placeholder="50"
                  value={editBandwidth}
                  onChange={(e) => setEditBandwidth(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <InputGroupAddon>
                  <GaugeIcon
                    strokeWidth={3}
                    className="group-focus-within:text-primary"
                  />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="group-focus-within:text-primary">
                    Mbps
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.bandwidth && (
                <p className="mt-1 text-destructive text-sm">
                  {errors.bandwidth}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label>Price</Label>
              <InputGroup className="group mt-2.5">
                <InputGroupInput
                  type="number"
                  placeholder="1000"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <InputGroupAddon>
                  <BadgeTurkishLiraIcon className="group-focus-within:text-primary" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="group-focus-within:text-primary">
                    BDT
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.price && (
                <p className="mt-1 text-destructive text-sm">{errors.price}</p>
              )}
            </div>
          </div>

          <DrawerFooter>
            <div className="flex justify-center items-center gap-4 mt-3">
              {loading ? (
                <Button disabled>
                  <FastSpinner /> Updating
                </Button>
              ) : (
                <Button onClick={handleEdit}>Update</Button>
              )}
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default EditPackageDrawer
