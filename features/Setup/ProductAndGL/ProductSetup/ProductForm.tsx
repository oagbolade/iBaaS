'use client';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { ProductDetailsForm } from './AddProductFromDetails';
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
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons2 } from '@/components/Revamp/Radio/RadioButton2';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { useGetProductTypeByid } from '@/api/setup/useProduct';
import { IProdCodeType, IProdType } from '@/api/ResponseTypes/setup';

type Props = {
  handleClose: Function;
  closeModalQuickly?: Function;
  // eslint-disable-next-line react/no-unused-prop-types
  data?: IProdType[] | IProdCodeType[] | Array<any>;
};

export const ProductForm = ({ handleClose, closeModalQuickly }: Props) => {
  const { isMobile } = useCurrentBreakpoint();
  const [openModel, setOpenModel] = useState(false); // Fixed Boolean to false
  const router = useRouter();
  const [addValues, setAddValues] = useState<string>(''); // Typed as string
  const { data: productTypeId } = useGetProductTypeByid(
    addValues as unknown as string
  );

  const handleChange = (value: string) => {
    localStorage.setItem('addProduct', value);
    setAddValues(value);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const handleContinue = () => {
    setOpenModel(true); // Logic to open the modal
  };

  return (
    <Box sx={AccountPasswordContainer}>
      <Box sx={AccountPasswordTitleContainer}>
        <Box sx={AccountPasswordTitle}>
          <PageTitle title="Add New Product" styles={{ ...AccountTitle }} />
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
            options={[
              { label: 'Loan', value: '3' },
              { label: 'CASA', value: '1' },
              { label: 'Treasury', value: '4' }
            ]}
            title="Kindly select which product you want to add"
            name="addProduct"
            customStyle={{ display: 'flex' }}
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

      {openModel && (
        <ModalContainerV2
          form={
            <ProductDetailsForm
              handleClose={handleClose}
              data={productTypeId}
            />
          }
        />
      )}
    </Box>
  );
};
