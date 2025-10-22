import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FastSpinner } from '../shared/FastSpinner';
import { useCloudinaryUpload } from './useCloudinaryUpload';

export const ImageUpload = ({
  value,
  onChange,
  disabled = false,
  className,
  maxSize = 5, // MB
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);
  const { uploadImage, uploading, error, cancelUpload } = useCloudinaryUpload();

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    if (file.size > maxSize * 1024 * 1024) {
      throw new Error(`File size must be less than ${maxSize}MB`);
    }

    return true;
  };

  const handleUpload = async (file) => {
    let previewUrl = null;

    try {
      setLocalError(null);
      validateFile(file);

      // Create preview
      previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload to cloudinary
      const imageUrl = await uploadImage(file);

      // Return the URL to parent component
      onChange(imageUrl);

      // Update preview with actual Cloudinary URL
      setPreview(imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setLocalError(err.message);
      setPreview(null);
      onChange(null);
    } finally {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || uploading) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleRemove = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    onChange(null);
    setLocalError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleCancel = () => {
    cancelUpload();
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(value || null);
    setLocalError(null);
  };

  const displayError = error || localError;

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled || uploading}
      />

      {preview ? (
        <Card className="group relative overflow-hidden">
          <div className="relative w-full aspect-video">
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-auto object-cover"
            />

            {/* overlay on hover */}
            <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleClick}
                disabled={disabled || uploading}
              >
                <Upload className="mr-2 w-4 h-4" />
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled || uploading}
              >
                <X className="mr-2 w-4 h-4" />
                Remove
              </Button>
            </div>

            {/* uploading overlay */}
            {uploading && (
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/60">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            'border-2 border-dashed transition-colors cursor-pointer',
            isDragging && 'border-primary bg-primary/5',
            disabled && 'opacity-60 cursor-not-allowed',
            uploading && 'cursor-wait'
          )}
        >
          <div className="flex flex-col justify-center items-center text-center">
            {uploading ? (
              <>
                <FastSpinner className="mb-4 w-12 h-12 text-muted-foreground animate-spin" />
                <p className="mb-3 text-muted-foreground text-sm">Uploading...</p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <div className="bg-primary/10 mb-4 p-4 rounded-full">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">
                  Drop your image here, or browse
                </h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  Supports: JPG, PNG, GIF (Max {maxSize}MB)
                </p>
                <Button type="button" variant="secondary" size="sm">
                  <Upload className="mr-2 w-4 h-4" />
                  Select Image
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      {displayError && (
        <p className="mt-2 text-destructive text-sm">{displayError}</p>
      )}
    </div>
  );
};