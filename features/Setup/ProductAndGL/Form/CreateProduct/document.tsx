import React from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
import { IProdDocs } from '@/api/ResponseTypes/setup';
import { useGetAllProductDocs } from '@/api/setup/useProduct';
import { FormSkeleton } from '@/components/Loaders';
import { labelTypography } from '@/components/Labels/styles';
import colors from '@/assets/colors';

export const DocumentForm = () => {
  const { prodDocs, isLoading } = useGetAllProductDocs();
  const { isTablet } = useCurrentBreakpoint();
  const { setFieldValue, values } = useFormikContext<any>(); // Access Formik context

  if (isLoading) {
    return (
      <Box>
        <FormSkeleton noOfLoaders={1} />
      </Box>
    );
  }


  
  const handleCheck = (docId: string) => {
    const currentDocIds = values.ProdDocuments || [];
    const updatedDocIds = currentDocIds.includes(docId)
      ? currentDocIds.filter((id: string) => id !== docId) // Remove if already selected
      : [...currentDocIds, docId]; // Add if not selected
    setFieldValue('ProdDocuments', updatedDocIds); // Update Formik state
  };

  return (
    <Grid ml={1} container spacing={2}>
      {prodDocs?.map((doc: IProdDocs) => (
        <Grid item={isTablet} mobile={6} key={doc.docid}>
          <Box sx={{ display: 'flex', width: '50%' }}>
            <Checkbox
              checked={values.ProdDocuments?.includes(String(doc.docid)) || false}
              onChange={() => handleCheck(String(doc.docid))}
            />
            <Typography
              mt={1}
              sx={{
                ...labelTypography,
                color: `${colors.neutral800}`,
                maxWidth: '100%',
                height: '20px',
                textWrap: 'wrap'
              }}
            >
              {doc.docName}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
