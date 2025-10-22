import { useRef, useState } from 'react';

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        throw err;
      }
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