'use client';
import React, { useState } from 'react';
import { Formik, Form } from 'formik'; // Import Formik and Form
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
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
import { FormSelectField } from '@/components/FormikFields';
import { IProdCodeType, IProdType } from '@/api/ResponseTypes/setup';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';

type Props = {
  handleClose: Function;
  closeModalQuickly?: Function;
  data?: IProdType[] | IProdCodeType[] | Array<any>;
};

export const ProductDetailsForm = ({
  handleClose,
  closeModalQuickly,
  data
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  // openModel state removed (not used)
  const router = useRouter();
  const [addProductValues, setAddValues] = useState<string>('');

  const { mappedProductClassTypeId } = useMapSelectOptions({ data });

  const handleChange = (value: string) => {
    localStorage.setItem('addProduct', value);
    setAddValues(value);
  };

  // read stored product selection (may be null if not set)
  const productValue = localStorage.getItem('addProduct') ?? '';

  const handleContinue = () => {
    let route: string | null = null;

    if (addProductValues === '1' && productValue) {
      switch (productValue) {
        case '1':
          route = '/setup/product-gl/add-casa-product';
          break;
        case '3':
          route = '/setup/product-gl/add-product';
          break;
        case '4':
          route = '/setup/product-gl/add-treasury-product';
          break;
        default:
      }
    } else if (addProductValues === '2' && productValue) {
      switch (productValue) {
        case '1':
          route = '/setup/product-gl/add-casa-product';
          break;
        case '3':
          route = '/setup/product-gl/add-product';
          break;
        case '4':
          route = '/setup/product-gl/add-treasury-product';
          break;
        default:
      }
    } else {
      // No explicit choice made; if there's a stored productValue, honor it
      switch (productValue) {
        case '1':
          route = '/setup/product-gl/add-casa-product';
          break;
        case '3':
          route = '/setup/product-gl/add-product';
          break;
        case '4':
          route = '/setup/product-gl/add-treasury-product';
          break;
        default:
      }
    }

    if (route) router.push(route);
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

      {/* Wrap the form content in Formik */}
      <Formik
        initialValues={{
          productclass: '',
          addProduct: ''
        }}
        onSubmit={() => {
          // Handle form submission if needed
          handleContinue();
        }}
      >
        {() => (
          <Form>
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
                    { label: 'Yes', value: '1' },
                    { label: 'No', value: '2' }
                  ]}
                  title="Would you like to setup this product from an existing product?"
                  name="addProducts"
                  customStyle={{
                    display: 'flex'
                  }}
                  value={addProductValues.toString()}
                  handleCheck={(value: string) => handleChange(value)}
                />
              </Box>
              {addProductValues === '1' && (
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <FormSelectField
                    name="productclass"
                    options={mappedProductClassTypeId}
                    label="Select Product"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    required
                  />
                </Box>
              )}
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
          </Form>
        )}
      </Formik>
    </Box>
  );
};
