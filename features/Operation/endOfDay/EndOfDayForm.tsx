'use client';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { string } from 'yup';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import {
  TypographyButton,
  TypographyConfirm,
  ButtonContainer,
  ButtonColorStyle,
  ButtonText,
  CancelButton,
  ConfirmButton,
  AccountPasswordContainer,
  AccountPasswordTitleContainer,
  AccountPasswordTitle,
  AccountTitle,
  AccountPasswordBodyContainer
} from '@/components/Revamp/Modal/style';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { handleRedirect, useCurrentBreakpoint } from '@/utils';
import { RadioButtons2 } from '@/components/Revamp/Radio/RadioButton2';

type Props = {
  handleClose: Function;
  closeModalQuickly?: Function;
};
export const EndOfDayForm = ({ handleClose, closeModalQuickly }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const router = useRouter();
  const [addValues, setAddValues] = useState<String>('');
  const handleChange = (value: string) => {
    localStorage.setItem('addProduct', value);
    setAddValues(value);
  };
  const handleContinue = () => {
    const path =
      addValues === '2'
        ? '/setup/product-gl/add-product'
        : '/setup/product-gl/add-casa-product';

    router.push(path);
  };
  return (
    <Box sx={AccountPasswordContainer}>
      <Box sx={AccountPasswordTitleContainer}>
        <Box sx={AccountPasswordTitle}>
          <PageTitle
            title="Configure End of Day"
            styles={{ ...AccountTitle }}
          />
          <IconButton
            onClick={() => closeModalQuickly?.() || handleClose(null)}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Box sx={AccountPasswordBodyContainer}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <RadioButtons2
            className="permissionOptions"
            options={[{ label: 'Manual', value: '1' }]}
            title="You get to run end of day at your own convenience "
            name="addProduct"
            customStyle={{
              display: 'flex'
            }}
            value={addValues.toString()}
            handleCheck={(value: string) => handleChange(value)}
          />
          <RadioButtons2
            className="permissionOptions"
            options={[{ label: 'Automatic', value: '2' }]}
            title="Your system runs end of day at a specific date and time you configure on the application"
            name="addProduct"
            customStyle={{
              display: 'flex'
            }}
            value={addValues.toString()}
            handleCheck={(value: string) => handleChange(value)}
          />
        </Box>
      </Box>

      <Box sx={ButtonContainer}>
        <Box sx={ButtonColorStyle}>
          <Box sx={ButtonText}>
            <Box sx={{ ...CancelButton, background: 'none' }}>
              <PrimaryIconButton
                onClick={() => closeModalQuickly?.() || handleClose(null)}
                buttonTitle="Cancel"
                customStyle={{
                  ...TypographyButton,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  padding: { mobile: '0 50px' }
                }}
              />
            </Box>
            <Box sx={{ ...ConfirmButton, background: 'none' }}>
              <PrimaryIconButton
                buttonTitle="Continue"
                customStyle={{
                  ...TypographyConfirm,
                  backgroundColor: `${colors.activeBlue400}`,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  borderRadius: '6px',
                  padding: { mobile: '8px 50px', desktop: '16px 78px' },
                  marginRight: { mobile: '70px', desktop: 0 }
                }}
                onClick={handleContinue}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
