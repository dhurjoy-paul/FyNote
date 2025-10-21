import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { PencilIcon } from "lucide-react"

const EditSampleDrawer = ({
  title = "Update Owner Details",
  subtitle = "Need to update your owner name, email or phone number?",
  btnSize = "sm",
  btnVariant = "ghost",
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size={btnSize}
          variant={btnVariant}
          className="gap-1.5 @sm/card:gap-2 text-xs @sm/card:text-sm shrink-0"
        >
          <PencilIcon className="size-3 @sm/card:size-3.5" />
          <span className="hidden @xs/card:inline">Edit</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto pb-6 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {subtitle}
            </DrawerDescription>
          </DrawerHeader>

          <p className="bg-muted/50 mx-auto px-4 py-4 border border-border rounded-lg w-fit text-sm text-center">
            Please contact our support team.
          </p>

          <DrawerFooter>
            <div className="flex justify-center items-center gap-4 mt-3">
              <Button className="gap-2" onClick={() => window.location.href = "/dashboard/account"}>
                Contact Support
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default EditSampleDrawer