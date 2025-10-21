import { FastSpinner } from "@/components/shared/FastSpinner"
import { ToastFailed, ToastSuccess } from "@/components/shared/ToastMassage"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { useUpdateProfile } from "@/hooks/allPutQueries"
import { Building2, ImageIcon, Pencil, Upload, X } from "lucide-react"
import { useRef, useState } from "react"

const EditAccountDrawer = ({ ispLogo, ispName }) => {
  const [open, setOpen] = useState(false)
  const [newIspName, setNewIspName] = useState("")
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState("")
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      setOpen(false)
      ToastSuccess("Profile updated successfully!")
      resetForm()
    },
    onError: (error) => {
      ToastFailed(error?.response?.data?.message || "Failed to update profile.")
      console.error("Update profile error:", error)
    }
  })

  const handleOpenChange = (isOpen) => {
    if (isPending && !isOpen) return

    setOpen(isOpen)
    if (isOpen) {
      setNewIspName(ispName || "")
      setLogoFile(null)
      setLogoPreview("")
      setErrors({})
    } else {
      resetForm()
    }
  }

  const resetForm = () => {
    setNewIspName("")
    setLogoFile(null)
    setLogoPreview("")
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        logo: "Only JPG, PNG, WebP, and SVG images are allowed."
      }))
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        logo: "Image size must be less than 5MB."
      }))
      return
    }

    // Clear logo error
    setErrors(prev => {
      const { logo, ...rest } = prev
      return rest
    })

    // Set file and preview
    setLogoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setLogoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validate = () => {
    const newErrors = {}

    // Name validation
    if (!newIspName.trim()) {
      newErrors.ispName = "ISP name is required."
    } else if (newIspName.trim().length < 3) {
      newErrors.ispName = "ISP name must be at least 3 characters."
    } else if (newIspName.trim().length > 50) {
      newErrors.ispName = "ISP name must not exceed 50 characters."
    }

    // Check if anything changed
    if (newIspName.trim() === ispName && !logoFile) {
      newErrors.form = "No changes detected."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = () => {
    if (!validate()) {
      ToastFailed("Please fix the errors before submitting.")
      return
    }

    // Create FormData for file upload
    const formData = new FormData()

    // Only append changed fields
    if (newIspName.trim() !== ispName) {
      formData.append("ispName", newIspName.trim())
    }

    if (logoFile) {
      formData.append("ispLogo", logoFile)
    }

    updateProfile(formData)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="size-3.5" /> Edit
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit ISP Profile</DrawerTitle>
            <DrawerDescription>
              Update your ISP name and logo.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 px-4 pb-4">
            {/* ISP Name */}
            <div>
              <Label htmlFor="isp-name">ISP Name</Label>
              <InputGroup className="group mt-2">
                <InputGroupInput
                  id="isp-name"
                  placeholder="Enter ISP name"
                  value={newIspName}
                  onChange={(e) => setNewIspName(e.target.value)}
                  disabled={isPending}
                  maxLength={50}
                />
                <InputGroupAddon>
                  <Building2
                    className="size-4 group-focus-within:text-primary transition-colors"
                    strokeWidth={2.5}
                  />
                </InputGroupAddon>
              </InputGroup>
              {errors.ispName && (
                <p className="mt-1.5 text-destructive text-sm">{errors.ispName}</p>
              )}
              <p className="mt-1 text-muted-foreground text-xs">
                {newIspName.length}/50 characters
              </p>
            </div>

            {/* Logo Upload */}
            <div>
              <Label>ISP Logo</Label>

              {/* Current/Preview Logo */}
              <div className="mt-2 mb-3">
                <div className="group relative bg-muted/30 border-2 border-border border-dashed rounded-xl w-32 h-32 overflow-hidden">
                  {logoPreview || ispLogo ? (
                    <>
                      <img
                        src={logoPreview || ispLogo}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                      {logoPreview && (
                        <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="size-8"
                            onClick={handleRemoveLogo}
                            disabled={isPending}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center w-full h-full text-muted-foreground">
                      <ImageIcon className="mb-2 size-10" />
                      <p className="text-xs">No logo</p>
                    </div>
                  )}
                </div>
                {logoPreview && (
                  <p className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <span className="inline-block bg-green-500 rounded-full size-2"></span>
                    New logo selected
                  </p>
                )}
              </div>

              {/* File Input */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  disabled={isPending}
                  className="hidden"
                  id="logo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                >
                  <Upload className="size-4" />
                  {logoPreview ? "Change Logo" : "Upload Logo"}
                </Button>
              </div>

              {errors.logo && (
                <p className="mt-1.5 text-destructive text-sm">{errors.logo}</p>
              )}
              <p className="mt-2 text-muted-foreground text-xs">
                Supported formats: JPG, PNG, WebP, SVG (max 5MB)
              </p>
            </div>

            {/* Form-level error */}
            {errors.form && (
              <div className="bg-muted/50 p-3 border border-border rounded-lg">
                <p className="text-muted-foreground text-sm text-center">{errors.form}</p>
              </div>
            )}
          </div>

          <DrawerFooter className="pt-4">
            <div className="flex gap-3">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                onClick={handleUpdate}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <FastSpinner />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default EditAccountDrawer