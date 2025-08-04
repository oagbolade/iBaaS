import { AlertColor } from '@mui/material';
import { toast } from '@/utils/toast';
import { IToastActions } from '@/constants/types';

export const isImageValid = (
  uploadedFile: File,
  toastActions: IToastActions
): boolean => {
  const fileSizeInKB = (uploadedFile.size / 1024).toFixed(2); // Convert size to KB and round to 2 decimal places
  const fileType = uploadedFile.type;

  // Maximum file size in KB (e.g., 100 KB)
  const maxFileSizeInKB = 10000; // 10 MB in KB

  // Accepted file types
  const acceptedFileTypes = ['image/jpeg', 'image/png'];

  // Check if file type is not one of the accepted file types
  if (!acceptedFileTypes.includes(fileType)) {
    const message = {
      message: 'File type not supported',
      title: 'Invalid file type',
      severity: 'error'
    };
    toast(
      message.message,
      message.title,
      message.severity as AlertColor,
      toastActions
    );

    return false;
  }

  // Check if file size is greater than maxSizeInKB
  if (parseFloat(fileSizeInKB) > maxFileSizeInKB) {
    const message = {
      message: 'File size exceeds maximum limit',
      title: 'File size exceeded',
      severity: 'error'
    };
    toast(
      message.message,
      message.title,
      message.severity as AlertColor,
      toastActions
    );

    return false;
  }

  // If both checks pass, the image is valid
  return true;
};
