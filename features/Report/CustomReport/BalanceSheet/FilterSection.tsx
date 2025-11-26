import React from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IBranches } from '@/api/ResponseTypes/general';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({ branches });

  const initialValues = {
    branchID: '',
    searchWith: ''
  };

  // ✅ Only branchID is required; searchWith can be empty
  const validationSchema = Yup.object({
    branchID: Yup.string().required('Branch selection is required')
  });

  const handleSubmit = async (values: any) => {
    onSearch?.({
      branchID: values.branchID,
      searchWith: values.searchWith?.trim() || ''
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Grid container spacing={2} alignItems="center">
          <Grid item mobile={12} tablet={3}>
            <FormSelectField
              name="branchID"
              label="Branch"
              options={mappedBranches}
              customStyle={{ width: setWidth() }}
            />
          </Grid>

          <Grid item mobile={12} tablet={8} mt={1}>
            <FormTextInput
              name="searchWith"
              label="Search"
              placeholder="Search"
            />
          </Grid>

          <Grid item mobile={12} tablet={1} mt={2.5}>
            <ActionButton
              type="submit"
              buttonTitle="Search"
              icon={<SearchIcon />}
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
