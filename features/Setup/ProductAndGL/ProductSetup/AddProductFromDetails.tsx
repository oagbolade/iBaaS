'use client';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import type { SelectChangeEvent } from '@mui/material/Select';
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
  productNumberFromInitialForm: string;
  closeModalQuickly?: Function;
  data?: IProdType[] | IProdCodeType[] | Array<any>;
};

export const ProductDetailsForm = ({
  handleClose,
  closeModalQuickly,
  data,
  productNumberFromInitialForm
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const router = useRouter();

  const [addProductValues, setAddValues] = useState<string>('');
  const [productValue, setProductValue] = useState<string>('');
  const [productNumber, setProductNumber] = useState<string>('');

  const { mappedProductClassTypeId } = useMapSelectOptions({ data });

  const handleRadioChange = (value: string) => {
    setProductValue('');
    setAddValues(value);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const val = event.target.value;
    localStorage.setItem('addProduct', val);
    setProductValue(val);
    setProductNumber(val);
  };

  const handleContinue = () => {
    let targetId: string;

    if (addProductValues === '1') {
      if (!productValue && !productNumber) return;
      targetId = productValue;
    } else {
      // "No" → create fresh → default to general product
      targetId = '3';
    }

    const routes: Record<string, string> = {
      '1': '/setup/product-gl/add-casa-product',
      '3': '/setup/product-gl/add-product',
      '4': '/setup/product-gl/add-treasury-product'
    };

    const casaProduct = '1';
    const loanProduct = '3';
    const treasuryProduct = '4';

    // From exisiting
    if (addProductValues === '1' && productNumberFromInitialForm === loanProduct) {
      router.push(routes[loanProduct]);
      return;
    } 
    
    if (addProductValues === '1' && productNumberFromInitialForm === casaProduct) {
      router.push(routes[casaProduct]);
      return;
    } 
    
    if ((addProductValues === '1' && productNumberFromInitialForm === treasuryProduct) || '') {
      router.push(routes[treasuryProduct]);
      return;
    }

    // From scratch
    if (addProductValues === '2' && productNumberFromInitialForm === casaProduct) {
      router.push(routes[casaProduct]);
      return;
    }

    if (addProductValues === '2' && productNumberFromInitialForm === loanProduct) {
      router.push(routes[loanProduct]);
      return;
    }

    if (addProductValues === '2' && productNumberFromInitialForm === treasuryProduct) {
      router.push(routes[treasuryProduct]);
      return;
    }

    const route = routes[targetId];
    if (route) {
      router.push(route);
    }
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

      <Formik
        initialValues={{
          productclass: productValue,
          addProducts: addProductValues
        }}
        enableReinitialize
        onSubmit={handleContinue}
      >
        {({ setFieldValue }) => (
          <Form>
            <Box sx={AccountPasswordBodyContainer}>
              <Box sx={{ width: '100%', maxWidth: '400px' }}>
                <RadioButtons2
                  title="Would you like to setup this product from an existing product?"
                  name="addProducts"
                  options={[
                    { label: 'Yes', value: '1' },
                    { label: 'No', value: '2' }
                  ]}
                  value={addProductValues} // ← Controlled
                  handleCheck={handleRadioChange}
                  customStyle={{ display: 'flex', gap: 4 }}
                />
              </Box>

              {addProductValues === '1' && (
                <Box sx={{ mt: 2, width: '100%', maxWidth: '400px' }}>
                  <FormSelectField
                    name="productclass"
                    options={mappedProductClassTypeId}
                    label="Select Product"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    required
                    value={productNumber}
                    onChange={(e) => {
                      const event = e as SelectChangeEvent<string>;
                      const val = event.target.value;
                      setFieldValue('productclass', val);
                      handleProductChange(event);
                    }}
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
                        height: '40px'
                      }}
                    />
                  </Box>

                  <Box sx={{ ...ConfirmButton, background: 'none' }}>
                    <PrimaryIconButton
                      buttonTitle="Continue"
                      type="submit"
                      customStyle={{
                        ...TypographyConfirm,
                        backgroundColor: colors.activeBlue400,
                        width: `${isMobile ? '80px' : '131px'}`,
                        height: '40px',
                        borderRadius: '6px',
                        padding: { mobile: '8px 50px', desktop: '16px 78px' },
                        marginRight: { mobile: '70px', desktop: 0 }
                      }}
                      disabled={
                        !addProductValues ||
                        (addProductValues === '1' && !productValue)
                      }
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
