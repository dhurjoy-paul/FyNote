import { FastSpinner } from "@/components/shared/FastSpinner"
import { ToastFailed, ToastSuccess } from "@/components/shared/ToastMassage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { useAddPackage } from "@/hooks/allPostQueries"
import { ALargeSmallIcon, BadgeTurkishLiraIcon, GaugeIcon } from "lucide-react"
import { useState } from "react"
import { LuPackagePlus } from "react-icons/lu"

const AddPackageDrawer = () => {
  const [open, setOpen] = useState(false)
  const [packageName, setPackageName] = useState("")
  const [bandwidth, setBandwidth] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState({})

  const resetForm = () => {
    setPackageName("")
    setBandwidth("")
    setPrice("")
    setErrors({})
  }

  const validate = () => {
    const newErrors = {}

    if (!packageName.trim()) newErrors.packageName = "Package name is required."

    if (bandwidth === "" || bandwidth === null) newErrors.bandwidth = "Bandwidth is required."
    else if (isNaN(bandwidth) || Number(bandwidth) <= 0)
      newErrors.bandwidth = "Enter a valid positive number."
    else if (!/^\d+(\.\d+)?$/.test(String(bandwidth)))
      newErrors.bandwidth = "Invalid number format."

    if (price === "" || price === null) newErrors.price = "Price is required."
    else if (isNaN(price) || Number(price) <= 0)
      newErrors.price = "Enter a valid positive price."
    else if (!/^\d+(\.\d+)?$/.test(String(price)))
      newErrors.price = "Invalid number format."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate: addPackage, isPending: isLoading } = useAddPackage({
    onSuccess: () => {
      ToastSuccess("Package added successfully!")
      resetForm()
      setOpen(false)
    },
    onError: (error) => {
      ToastFailed("Failed to add package. Please try again.")
      console.error("AddPackage error:", error)
    }
  });

  const handleSave = async () => {
    if (!validate()) {
      ToastFailed("Please fix the errors before submitting.")
      return
    }

    const packageData = {
      name: packageName.trim(),
      bandwidth: Number(bandwidth),
      price: Number(price),
    }

    addPackage(packageData);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Card
        className="@container/card group flex justify-center items-center dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md border-1 border-muted-foreground hover:border-primary/80 border-dashed text-muted-foreground transition-all duration-200 ease-in-out cursor-pointer select-none"
      >
        <DrawerTrigger asChild>
          <div className="flex flex-col justify-center items-center p-6">
            <LuPackagePlus className="group-hover:text-primary/90 text-4xl @[454px]/panel:text-5xl transition-all duration-200 ease-in-out" />
            <p className="mt-3 font-semibold group-hover:text-primary/90 text-lg @[454px]/panel:text-xl leading-0 transition-all duration-200 ease-in-out">
              Add Package
            </p>
          </div>
        </DrawerTrigger>
      </Card>

      <DrawerContent>
        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Package</DrawerTitle>
            <DrawerDescription className="text-center">
              Add a new network package.
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
                  <ALargeSmallIcon strokeWidth={2.5} className="group-focus-within:text-primary" />
                </InputGroupAddon>
              </InputGroup>
              {errors.packageName && (
                <p className="mt-1 text-destructive text-sm">{errors.packageName}</p>
              )}
            </div>

            {/* Bandwidth */}
            <div>
              <Label>Network Bandwidth</Label>
              <InputGroup className="group mt-2.5">
                <InputGroupInput
                  type="number"
                  placeholder="50"
                  value={bandwidth}
                  onChange={(e) => setBandwidth(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <InputGroupAddon>
                  <GaugeIcon strokeWidth={3} className="group-focus-within:text-primary" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="group-focus-within:text-primary">Mbps</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.bandwidth && (
                <p className="mt-1 text-destructive text-sm">{errors.bandwidth}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label>Price</Label>
              <InputGroup className="group mt-2.5">
                <InputGroupInput
                  type="number"
                  placeholder="1000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
                <InputGroupAddon>
                  <BadgeTurkishLiraIcon className="group-focus-within:text-primary" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="group-focus-within:text-primary">BDT</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.price && <p className="mt-1 text-destructive text-sm">{errors.price}</p>}
            </div>
          </div>

          <DrawerFooter>
            <div className="flex justify-center items-center gap-4 mt-3">
              {
                isLoading
                  ? <Button disabled><FastSpinner /> Saving</Button>
                  : <Button onClick={handleSave}>Save</Button>
              }
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddPackageDrawer
