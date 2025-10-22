import { ImageUpload } from '@/components/cloudinaryUpload/ImageUpload';
import CustomInputField from '@/components/shared/CustomInputField';
import { FastSpinner } from '@/components/shared/FastSpinner';
import { ToastFailed, ToastSuccess } from '@/components/shared/ToastMassage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePackages } from '@/hooks/allGetQueries';
import { validateBDPhone } from '@/lib/phoneValidation';
import { cn } from '@/lib/utils';
import { ALargeSmallIcon, FileText, MapPin, PhoneIcon, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';

const AddClient = () => {
  // const navigate = useNavigate();
  const { data: packages = [], isLoading: packagesLoading, error: packagesError } = usePackages();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, control, formState: { errors }, setError, watch } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      manualLocation: '',
      package_id: '',
      isPaid: false,
      image: '',
      note: '',
    },
  });

  const isPaid = watch('isPaid');
  const selectedPackageId = watch('package_id');

  const selectedPackage = packages.find(pkg => String(pkg.package_id) === String(selectedPackageId));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const phoneValidation = validateBDPhone(data.phone);

      if (!phoneValidation.isValid) {
        setError('phone', {
          type: 'manual',
          message: phoneValidation.error,
        });
        setIsSubmitting(false);
        return;
      }

      const clientData = {
        name: data.name.trim(),
        phone: phoneValidation.formatted,
        manualLocation: data.manualLocation.trim(),
        package_id: parseInt(data.package_id),
        isPaid: data.isPaid,
        image: data.image || null,
        note: data.note?.trim() || null,
        gMapLatitude: 22.281239,
        gMapLongitude: 91.784506,
      };

      console.log('Submitting client data:', clientData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      ToastSuccess('Client added successfully', `${clientData.name} has been added to the system.`);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Error creating client:', error);
      setSubmitError(error.message || 'Failed to create client. Please try again.');
      ToastFailed('Failed to create client', error.message || '');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packagesLoading) {
    return (
      <div className="@container/panel mx-auto py-8 container">
        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="py-12">
            <div className="flex flex-col justify-center items-center gap-3">
              <FastSpinner className="size-6 md:size-8 lg:size-12" />
              <p className="text-muted-foreground">Loading packages...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (packagesError) {
    return (
      // <div className="@container/panel mx-auto py-8 container">
      <div>
        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="py-12">
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-destructive">Failed to load packages</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="@container/panel mx-auto pb-8 container">
      <Card className="@container/card mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Add New Client
          </CardTitle>
          <CardDescription className="text-center">
            Fill in the client details below to add them to your system
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            {/* row 1: name + phone */}
            <div className="gap-5 @lg/panel:gap-6 grid grid-cols-1 @lg/panel:grid-cols-2">
              {/* name field */}
              <CustomInputField
                name="name"
                label="Full Name"
                placeholder="Enter client's full name"
                Icon={ALargeSmallIcon}
                register={register}
                errors={errors}
                validation={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                }}
              />

              {/* phone field */}
              <CustomInputField
                name='phone'
                label='Phone Number'
                type='tel'
                placeholder='01123456789'
                Icon={PhoneIcon}
                hintText='Enter 11-digit Bangladesh mobile number'
                register={register}
                errors={errors}
                validation={{ required: 'Phone number is required' }}
              />
            </div>

            {/* row 2: location */}
            <CustomInputField
              className="mt-5 @lg/panel:mt-0 mb-5"
              name="manualLocation"
              label="Location"
              placeholder="Enter client's address or location"
              Icon={MapPin}
              register={register}
              errors={errors}
              validation={{
                required: 'Location is required',
                minLength: {
                  value: 5,
                  message: 'Location must be at least 5 characters',
                },
              }}
            />

            {/* Row 3: Package + Payment Status */}
            <div className="gap-5 @lg/panel:gap-6 grid grid-cols-1 @lg/card:grid-cols-2 mb-5">
              {/* Package Selection */}
              <div className="space-y-2">
                <Label htmlFor="package_id" className="flex items-center gap-2 text-base">
                  Package <span className="text-destructive">*</span>
                </Label>
                <Controller
                  name="package_id"
                  control={control}
                  rules={{ required: 'Package is required' }}
                  render={({ field }) => (
                    <div className="space-y-3">
                      {!selectedPackage ? (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={cn(errors.package_id && 'border-destructive')}>
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.length > 0 ? (
                              packages.map((pkg) => {
                                const { package_id: id, name = "Package Name", bandwidth = "0", price = "0" } = pkg;
                                return (
                                  <SelectItem key={id} value={String(id)}>
                                    <div className='flex items-center'>
                                      <span className='w-35 text-start'>{name}</span>
                                      <span className='w-20'><span className='text-muted-foreground'>Mbps: </span> {bandwidth}</span>
                                      <span><span className='text-muted-foreground'>Tk:</span> {price}</span>
                                    </div>
                                    {/* {name} - {bandwidth} <span className='text-muted-foreground'>Mbps</span> - {price}<span className='text-muted-foreground'>tk</span> */}
                                  </SelectItem>
                                );
                              })
                            ) : (
                              <SelectItem value="no-packages" disabled>
                                No packages available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="bg-primary/5 p-4 border border-primary/20 rounded-lg">
                          <div className="">
                            <div className='flex justify-between items-start'>
                              <p className="font-semibold text-base">{selectedPackage.name}</p>
                              <Button onClick={() => field.onChange('')}
                                type="button" variant="outline" size="sm"
                              >
                                Change
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 border rounded-md text-sm">
                                <span className="font-medium text-muted-foreground">Speed:</span>
                                <span className="font-semibold">{selectedPackage.bandwidth}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 border rounded-md text-sm">
                                <span className="font-medium text-muted-foreground">Price:</span>
                                <span className="font-semibold">{selectedPackage.price}</span>
                              </span>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.package_id && (
                  <p className="text-destructive text-sm">
                    {errors.package_id.message}
                  </p>
                )}
              </div>

              {/* Payment Status */}
              <div className="space-y-2 mt-1 @lg/panel:mt-0">
                <Label className="text-base">Payment Status</Label>
                <Controller
                  name="isPaid"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-3 bg-muted/50 hover:bg-muted/70 p-4 border rounded-lg transition-colors">
                      <Checkbox
                        id="isPaid"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="isPaid" className="flex-1 font-medium text-sm cursor-pointer">
                        Mark as Paid
                      </Label>
                      <div className={cn(field.value ? "visible" : "invisible", "bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full font-medium text-green-700 dark:text-green-100 text-xs whitespace-nowrap")}>
                        Paid
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>            

            {/* row 4: Image Upload */}
            <div className="space-y-2 mb-6">
              <Label className="flex items-center gap-2 text-base">
                Client Photo
                <span className="font-normal text-muted-foreground text-sm">(Optional)</span>
              </Label>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    maxSize={3}
                  />
                )}
              />
            </div>

            {/* row 5: note */}
            <InputGroup>
              <InputGroupTextarea
                id="note"
                placeholder="Add any additional notes about the client..."
                {...register('note')}
                className="min-h-[80px]"
              />
              <InputGroupAddon align="block-start" className="border-b">
                <InputGroupText >
                  <span className="flex items-center gap-1.5 text-primary text-base"><FileText /> Notes</span>
                  <span>(Optional)</span>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {/* Error Message */}
            {submitError && (
              <div className="bg-destructive/10 p-4 border border-destructive rounded-lg">
                <p className="text-destructive text-sm">{submitError}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 pt-4 pb-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <FastSpinner />
                    Creating Client...
                  </>
                ) : (
                  <>
                    <UserPlus className="size-4" />
                    Add Client
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClient;