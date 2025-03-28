/* eslint-disable no-undef */
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { addChargeType, chargeTypeStyle } from './style';
import {
  FormTextInput,
  FormSelectField,
  CheckboxInput,
  FormikRadioButton
} from '@/components/FormikFields';
import {
  applicationTaxOption,
  EditOperations
} from '@/constants/OperationOptions';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { LargeTitle } from '@/features/Administrator/Role/ViewRole';
import { FormSkeleton } from '@/components/Loaders';
import { useCreateCharge, useGetChargeByCode } from '@/api/setup/useCharges';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { createChargeInitialValues } from '@/schemas/schema-values/setup';
import { createChargeSchema } from '@/schemas/setup';
import { decryptData } from '@/utils/decryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { getStoredUser } from '@/utils/user-storage';
import { MenuItemsType } from '@/api/ResponseTypes/login';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];
type Props = {
  chargeId: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  branches?: IBranches[] | Array<any>;
};
type MenuItemType = {
  menu_name: string;
  menu_id?: string; // Optional property if menu_id might not exist
};
export const CreateCharges = ({
  chargeId,
  isSubmitting,
  setIsSubmitting,
  branches
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });
  const isEditing = searchParams.get('isEditing');
  const [chargeType, setChargeType] = useState();
  const { mutate } = useCreateCharge(
    Boolean(isEditing),
    decryptData(chargeId as string)
  );
  const { charge, isLoading } = useGetChargeByCode(
    decryptData(chargeId as string) || null
  );
  const [applicationTax, setApplicationTax] = React.useState<boolean>(false);
  const rawMenuItems = getStoredUser()?.menuItems;
  const menuItems: MenuItemsType[] = Array.isArray(rawMenuItems)
    ? (rawMenuItems as MenuItemsType[])
    : [];
  const manageCharges =
    menuItems.find((item) => item.menu_name === 'MANAGE CHARGES') ?? null;
  const menuId = String(manageCharges?.menu_id);
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    mutate({
      chargeDesc: values.chargeDesc,
      liqMode: values.liqMode,
      branchMask: values.branchMask,
      freq: values.freq,
      glCode: values.glCode,
      tableTypeModel: [
        {
          chargeType: values.chargeType,
          rule1: 0,
          startRange: 0,
          endRange: 0,
          rate: 0,
          amount: 0
        }
      ],
      chargeBasis: 0,
      chargeamt: 0,
      liqperiod: 0,
      targetBase: '',
      drgl: '',
      crgl: '',
      accrualRequired: 0,
      authid: '',
      menuid: Number(menuId),
      userid: '',
      firedCharges: ''
    });
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);
  const handleSelected = (value: boolean) => {
    setApplicationTax(value);
  };

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }
  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add New'} Charges`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={charge || createChargeInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createChargeSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid item={isTablet} mobile={12} mb={2}>
                  <FormSelectField
                    name="chargeType"
                    options={EditOperations.chargeType}
                    label="Charge Type"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    onChange={(e: any) => {
                      setChargeType(e.target.value);
                    }}
                  />
                </Grid>
                {chargeType === '3' && (
                  <Grid item={isTablet} mobile={12} sx={addChargeType}>
                    <Box sx={chargeTypeStyle}>
                      <Box>
                        <FormikRadioButton
                          options={[
                            { label: 'Rate ', value: '1' },
                            { label: 'Amount', value: '0' },
                            { label: 'Mixed', value: '2' }
                          ]}
                          title="Select Charge Type"
                          name="targetBase"
                          value="1"
                        />
                      </Box>
                      <Box mr={5}>
                        <Grid item={isTablet} mobile={12}>
                          <FormTextInput
                            name="startRange"
                            placeholder="Enter Start Range"
                            label="Start Range"
                            customStyle={{
                              width: setWidth(isMobile ? '250px' : '290%')
                            }}
                          />
                        </Grid>
                        <Grid item={isTablet} mobile={12}>
                          <FormTextInput
                            name="endRange"
                            placeholder="Enter End Range"
                            label="End Range"
                            customStyle={{
                              width: setWidth(isMobile ? '250px' : '290%')
                            }}
                          />
                        </Grid>
                        <Grid item={isTablet} mobile={12}>
                          <FormTextInput
                            name="rate"
                            placeholder="Enter Rate"
                            label="Rate"
                            customStyle={{
                              width: setWidth(isMobile ? '250px' : '290%')
                            }}
                          />
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                )}
                {isEditing && (
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="chargeCode"
                      placeholder="Enter Charges Code"
                      label="Charges Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                )}
                <Grid item={isTablet} mobile={12} mt={2}>
                  <FormTextInput
                    name="chargeDesc"
                    placeholder="Enter Charge Name"
                    label="Charge Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="liqMode"
                    options={EditOperations.liquidationMode}
                    label="Liquidation Mode"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                {chargeType === '1' && (
                  <Grid item={isTablet} mobile={12}>
                    <FormAmountInput
                      name="chargeamt"
                      placeholder="Enter Charge Amount"
                      label="Charge Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                )}
                {chargeType === '2' && (
                  <Grid item={isTablet} mobile={12}>
                    <FormAmountInput
                      name="chargeamt"
                      placeholder="Enter Charge Amount"
                      label="Charge Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                )}

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="branchMask"
                    options={mappedBranches}
                    label="Nominated Branch"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="freq"
                    options={EditOperations.takeCharge}
                    label="When will charge take place?"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="glCode"
                    placeholder="Enter Income GL"
                    label="Income GL Account"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                  <FormikRadioButton
                    name="accrualRequired"
                    title="Does this have Applicable Taxes?"
                    options={applicationTaxOption}
                    value={applicationTax?.toString()}
                    handleCheck={(e: boolean) => handleSelected(e)}
                  />
                </Grid>
                {applicationTax && (
                  <Box>
                    <Grid item={isTablet} mobile={12}>
                      <CheckboxInput
                        className="checkboxPermissions"
                        label="Value Added Taxes(VAT)"
                        name="freq"
                      />
                    </Grid>
                    <Box sx={{ marginTop: 3 }}>
                      <Grid item={isTablet} mobile={12}>
                        <CheckboxInput
                          className="checkboxPermissions"
                          label="Withholding Tax(WHT)"
                          name="freq"
                        />
                      </Grid>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
