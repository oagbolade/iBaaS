import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from './style';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const { mappedBranches } = useMapSelectOptions({ branches });
  const { setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: selectedBranch || null,
      accountNo: searchTerm || undefined
    };
    onSearch?.(params);
  };
  return (
    <Box>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <Box sx={{ marginTop: '20px', paddingX: '24px' }}>
            <Grid container spacing={2}>
              <Grid item mobile={12} tablet={3} justifyContent="center">
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields
                  }}
                  name="branchID"
                  value={selectedBranch}
                  options={mappedBranches}
                  label="Branch ID"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedBranch(e.target.value)
                  }
                />
              </Grid>
              <Grid
                mb={{ tablet: 6 }}
                item
                mobile={12}
                tablet={8}
                justifyContent="center"
              >
                <TextInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields
                  }}
                  icon={<SearchIcon />}
                  value={searchTerm}
                  name="accountNo"
                  placeholder="Search a customer by Name or Account Number"
                  label="Account Number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </Grid>
              <Grid
                item
                mobile={12}
                tablet={1}
                sx={{ display: 'flex' }}
                justifyContent="flex-end"
                mt={{ tablet: 3.2 }}
                mr={{ mobile: 30, tablet: 0 }}
                mb={{ mobile: 6, tablet: 0 }}
              >
                <ActionButton
                  customStyle={buttonBackgroundColor}
                  buttonTitle="Search"
                  type="submit"
                />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
