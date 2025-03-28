import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  fileUpload,
  signUpDoumentUploadHeadingText,
  signUpDocumeentUploadSubheadingText,
  uploadlabel,
  fileName,
  fileSize,
  removeButton,
  fileDetailsContainer,
  removeAndSizeContainer,
  stepTwoProceedButton,
  backButtonIcon,
  backButtonText,
  backButtonContainer
} from './styles';
import { SignupFormSubheading } from './SignupFormSubHeading';
import { SignupFormHeading } from './SignupFormHeading';
import { isImageValid } from '@/utils/isImageValid';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { PrimaryIconButton } from '@/components/Buttons';
import { formatFileSize } from '@/utils/formatFileSize';
import { UploadDocument } from '@/assets/svg';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export const StepTwo = ({ setStep }: Props) => {
  const toastActions = React.useContext(ToastMessageContext);

  const router = useRouter();

  const [bankLogo, setBankLogo] = useState<any>();
  const [bankLoginImage, setBankLoginImage] = useState<any>();

  const handleFileChange = (event: any, type: string) => {
    const fileFromEvent = event.target.files?.[0];
    if (!fileFromEvent) return;
    if (!isImageValid(fileFromEvent, toastActions)) return;

    if (type === 'loginImage') {
      setBankLoginImage(fileFromEvent);
    } else {
      setBankLogo(fileFromEvent);
    }
  };

  const onSubmit = () => {
    router.push('/dashboard');
  };

  const StyledContainer = styled(Box)(() => ({
    overflow: 'auto',
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome, Safari, Opera
    }
  }));

  return (
    <Stack display="flex" flex={4}>
      <StyledContainer
        sx={{
          padding: {
            desktop: '30px 200px 0 200px',
            mobile: '50px 50px 0 50px'
          },
          width: { desktop: '55vw', mobile: '100vw' },
          overflowY: 'scroll',
          height: '100vh'
        }}
      >
        <SignupFormHeading text="Theme your application" />

        <SignupFormSubheading text="Theme your application to fit your organisation" />

        <Box>
          <Typography sx={uploadlabel}>Upload Bank Logo</Typography>

          <Button component="label" tabIndex={-1} sx={fileUpload}>
            <UploadDocument />
            <Typography sx={signUpDoumentUploadHeadingText}>
              Tap here to upload your document
            </Typography>
            <Typography sx={signUpDocumeentUploadSubheadingText}>
              JPG or PNG. File size no more than 10MB
            </Typography>
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileChange(e, 'bankLogo')}
            />
          </Button>

          {bankLogo && (
            <Box sx={fileDetailsContainer}>
              <Typography sx={fileName}>{bankLogo?.name}</Typography>

              <Box sx={removeAndSizeContainer}>
                <Typography sx={fileSize}>
                  {formatFileSize(bankLogo?.size)}
                </Typography>

                <Typography onClick={() => setBankLogo('')} sx={removeButton}>
                  Remove
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Typography sx={uploadlabel}>Upload Login Image</Typography>

          <Button component="label" tabIndex={-1} sx={fileUpload}>
            <UploadDocument />
            <Typography sx={signUpDoumentUploadHeadingText}>
              Tap here to upload your document
            </Typography>
            <Typography sx={signUpDocumeentUploadSubheadingText}>
              JPG or PNG. File size no more than 10MB
            </Typography>
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileChange(e, 'loginImage')}
            />
          </Button>

          {bankLoginImage && (
            <Box sx={fileDetailsContainer}>
              <Typography sx={fileName}>{bankLoginImage?.name}</Typography>

              <Box sx={removeAndSizeContainer}>
                <Typography sx={fileSize}>
                  {formatFileSize(bankLoginImage?.size)}
                </Typography>

                <Typography
                  onClick={() => setBankLoginImage('')}
                  sx={removeButton}
                >
                  Remove
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <PrimaryIconButton
          type="submit"
          buttonTitle="Proceed"
          customStyle={stepTwoProceedButton}
          onClick={onSubmit}
        />

        <Box sx={backButtonContainer} onClick={() => setStep(1)}>
          <ArrowBackIcon sx={backButtonIcon} />
          <Typography sx={backButtonText}>Back to previous screen</Typography>
        </Box>
      </StyledContainer>
    </Stack>
  );
};
