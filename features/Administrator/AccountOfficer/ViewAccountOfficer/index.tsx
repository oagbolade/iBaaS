'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { viewOfficerContainer } from './styles';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { Status } from '@/components/Labels';
import { useGetAccountOfficerByCode } from '@/api/admin/useAccountOfficer';
import { FormSkeleton } from '@/components/Loaders';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

export const ViewAccountOfficer = () => {
  const officerCode = useGetParams('officerCode') || '';
  const { officer, isLoading } = useGetAccountOfficerByCode(encryptData(officerCode));

  if (isLoading && officer) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <AdminContainer>
        <Box sx={viewOfficerContainer}>
          <Grid container spacing={2}>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="NAME" />
              <Details title={officer?.officerName || 'N/A'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="STAFF/LOGIN ID" />
              <Details title={officer?.officercode || 'N/A'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="BRANCH" />
              <Details title={officer?.branchName || 'N/A'} />{' '}
            </Grid>

            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="DEPARTMENT" />
              <Details title={officer?.dept || 'N/A'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="EMAIL ADDRESS" />
              <Details title={officer?.email || 'N/A'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="PHONE NUMBER" />
              <Details title={officer?.phone || 'N/A'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="Is this staff a supervisor?" />
              <Details title={officer?.auth ? 'Yes' : 'No'} />{' '}
            </Grid>
            <Grid sx={{ width: '33%' }} item desktop={4}>
              <SubTitle title="STAFF STATUS" />
              <Status
                label={officer?.status ? 'Active' : 'Inactive'}
                status={officer?.status ? 'success' : 'warning'}
              />{' '}
            </Grid>
          </Grid>
        </Box>
      </AdminContainer>
    </>
  );
};
