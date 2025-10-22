import { useRef, useState } from 'react';

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      const errorMsg = 'Cloudinary configuration is missing. Please check environment variables.';
      setError(errorMsg);
      setUploading(false);
      throw new Error(errorMsg);
    }

    abortControllerRef.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        let errorMessage = 'Upload failed';

        if (response.status === 400) {
          errorMessage = errorData.error?.message || 'Invalid upload configuration. Please check your Cloudinary settings.';
        } else if (response.status === 401) {
          errorMessage = 'Unauthorized. Please check your Cloudinary credentials.';
        } else if (response.status === 413) {
          errorMessage = 'File is too large.';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        throw err;
      }
      return null;
    } finally {
      setUploading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { uploadImage, uploading, error, cancelUpload };
};