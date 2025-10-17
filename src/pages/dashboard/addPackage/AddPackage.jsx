import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { ALargeSmallIcon, BadgeTurkishLiraIcon, GaugeIcon } from "lucide-react"
import { LuPackagePlus } from "react-icons/lu"

const AddPackage = () => {
  return (
    <Drawer>
      <Card className={`@container/card flex items-center justify-center dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out text-muted-foreground border-dashed border-1 border-muted-foreground cursor-pointer select-none group hover:border-primary/80`}
      >
        <DrawerTrigger>
          <LuPackagePlus className="group-hover:text-primary/90 text-4xl @[454px]/panel:text-5xl transition-all duration-200 ease-in-out" />
          <p className="mb-3 @[454px]/panel:mb-0 font-semibold group-hover:text-primary/90 text-lg @[454px]/panel:text-xl leading-0 transition-all duration-200 ease-in-out">Add Package</p>
        </DrawerTrigger>
      </Card>


      <DrawerContent>
        {/* main form */}
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add package</DrawerTitle>
            <DrawerDescription>Add unlisted new package</DrawerDescription>
          </DrawerHeader>

          {/* main form */}
          <div className="gap-6 grid w-full max-w-sm">
            <InputGroup className="group">
              <InputGroupInput placeholder="Package name" />
              <InputGroupAddon>
                <ALargeSmallIcon strokeWidth={2.5} className="group-focus-within:text-primary" />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="group">
              <InputGroupInput type="number" placeholder="Network bandwidth" />
              <InputGroupAddon>
                <GaugeIcon strokeWidth={3} className="group-focus-within:text-primary" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText className="group-focus-within:text-primary">Mbps</InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="group">
              <InputGroupInput type="number" placeholder="Price" />
              <InputGroupAddon>
                <BadgeTurkishLiraIcon className="group-focus-within:text-primary" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText className="group-focus-within:text-primary">BDT</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <DrawerFooter >
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default AddPackage