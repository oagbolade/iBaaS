import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { Formik, Form } from 'formik';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { statementOfAccountSchema } from '@/schemas/reports';
import { inputFields } from '../style';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';

type Props = {
  branches?: IBranches[];
  bankproducts: IBankProducts[];
  onSearch?: Function;
};

const AccountTypeOptions = [
  { value: '1', name: 'Casa' },
  { value: '2', name: 'Term Deposit' },
  { value: '3', name: 'Loan' },
  { value: '4', name: 'GL' },
];

export const FilterSection = ({ branches, onSearch, bankproducts }: Props) => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts,
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      accountNumber: values.accountNumber || values.searchWith,
      ...(values.productcode && { accttype: values.productcode }),
      ...(values.branchID && { branchID: values.branchID }),
    };
    onSearch?.(params);
  };

  return (
    <Box>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={statementOfAccountSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '10px',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    name="productcode"
                    options={AccountTypeOptions}
                    label="Account Type"
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                  />
                </Grid>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch ID"
                  />
                </Grid>

                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={4}
                  justifyContent="center"
                  marginTop={3}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                    icon={<SearchIcon />}
                    name="accountNumber"
                    placeholder="Search by Account number"
                    label=""
                  />
                </Grid>
                <Grid
                  item
                  mobile={12}
                  tablet={2}
                  sx={{ display: 'flex' }}
                  justifyContent="flex-end"
                  mt={{ tablet: 3.2 }}
                  mr={{ mobile: 30, tablet: 0 }}
                  mb={{ mobile: 6, tablet: 0 }}
                  ml={{ mobile: 0, tablet: 0 }}
                >
                  <ActionButton
                    customStyle={{
                      backgroundColor: `${colors.activeBlue400}`,
                      border: `1px solid ${colors.activeBlue400}`,
                      color: `${colors.white}`,
                      width: '100%',
                    }}
                    type="submit"
                    buttonTitle="Search"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
