'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import {
  IViewAccountInfo,
  ShortCardWithViewDetailsAccordion
} from './ShortCardViewDetails';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetCustomerById } from '@/api/customer-service/useCustomer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

export const ViewDetailContainer = () => {
  const customerId = useGetParams('customerId') || '';

  const { customerResult, isLoading } = useGetCustomerById(
    encryptData(customerId) as string
  );

  if (isLoading) {
    return (
      <Box my={6}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const PickCustomerType = (customerType: string): string => {
    if (customerType === '1') {
      return 'Individual';
    }

    if (customerType === '2') {
      return 'Corporate';
    }

    return 'N/A';
  };

  const ViewCustomerDetailsMapper = {
    personalDetails: [
      {
        title: 'Customer Type',
        content: PickCustomerType(customerResult.customerType)
      },
      { title: 'Title', content: customerResult.title || 'N/A' },
      { title: 'Surname', content: customerResult.surName || 'N/A' },
      { title: 'First Name', content: customerResult.firstName || 'N/A' },
      { title: 'Middle Name', content: customerResult.othername || 'N/A' },
      { title: 'Gender', content: customerResult.sex || 'N/A' },
      {
        title: 'Date of Birth',
        content: moment(customerResult.dob).format('MMMM Do YYYY') || 'N/A'
      },
      { title: 'Nationality', content: customerResult.nationality || 'N/A' },
      { title: 'State', content: customerResult.statecode || 'N/A' },
      {
        title: "Mother's Maiden Name",
        content: customerResult.mothermdName || 'N/A'
      },
      { title: 'BVN', content: customerResult.bvn || 'N/A' },
      { title: 'Email Address', content: customerResult.email || 'N/A' },
      {
        title: 'Mobile Phone 1',
        content: customerResult.phone1 || 'N/A'
      },
      {
        title: 'Mobile Phone 2',
        content: customerResult.phone2 || 'N/A'
      },
      {
        title: 'National ID NO',
        content: customerResult.iDno || 'N/A'
      }, // TODO: missing in reponse, report to infosight
      {
        title: 'Tax Identity NO',
        content: customerResult.taxId || 'N/A'
      },
      {
        title: 'Resident Country',
        content: customerResult.residentCountry || 'N/A'
      },
      {
        title: 'Resident State',
        content: customerResult.residentStatecode || 'N/A'
      },
      {
        title: 'Resident City/Town',
        content: customerResult.residentTowncode || 'N/A'
      },
      {
        title: 'Resident Address',
        content: customerResult.address || 'N/A'
      },
      { title: 'Sector', content: customerResult.sectorcode || 'N/A' },
      { title: 'Business', content: customerResult.occupation || 'N/A' },
      {
        title: 'Education Level',
        content: customerResult.eduLevel || 'N/A'
      }
    ],
    businessDetails: [
      {
        title: 'Country',
        content: customerResult.bizCtry || 'N/A'
      },
      { title: 'State', content: customerResult.bizState || 'N/A' },
      { title: 'LGA', content: customerResult.bizTowncode || 'N/A' },
      {
        title: 'Resident Address',
        content: customerResult.bizAddress || 'N/A'
      },
      { title: 'Phone Number', content: customerResult.bizPhone3 || 'N/A' },
      { title: 'Signatory Class', content: customerResult.sigClass || 'N/A' }
    ],
    nextOfKinDetails: [
      {
        title: 'Full name',
        content: customerResult.nextOfKin || 'N/A'
      },
      {
        title: 'Phone Number',
        content: customerResult.nextOfKinphone || 'N/A'
      },
      {
        title: 'Resident Address',
        content: customerResult.nextOfKinaddr || 'N/A'
      },
      { title: 'Relationship', content: customerResult.nextOfKinRel || 'N/A' },
      { title: 'State', content: customerResult.nextOfKinState || 'N/A' },
      { title: 'LGA', content: customerResult.nextOfKintown || 'N/A' }
    ],
    identificationDetails: [
      {
        title: 'ID Type',
        content: customerResult.idType || 'N/A'
      },
      { title: 'ID NO', content: customerResult.iDno || 'N/A' },
      {
        title: 'Issue Date',
        content:
          moment(customerResult.idIssueDate).format('MMMM Do YYYY') || 'N/A'
      },
      {
        title: 'Expiry Date',
        content:
          moment(customerResult.idExpryDate).format('MMMM Do YYYY') || 'N/A'
      }
    ],
    referrerDetails: [
      {
        title: 'Name',
        content: customerResult.refname || 'N/A'
      },
      { title: 'Phone Number', content: customerResult.refphone || 'N/A' },
      { title: 'Introducer', content: customerResult.introid || 'N/A' }, // TODO: missing in reponse, report to infosight
      { title: 'Introducer ID', content: customerResult.introid || 'N/A' },
      {
        title: 'Account Officer',
        content: customerResult.acctOfficer || 'N/A'
      },
      { title: 'Group Member', content: customerResult.nextOfKinaddr || 'N/A' }, // TODO: missing in reponse, report to infosight
      {
        title: 'Signatory to Another Account',
        content: customerResult.signacct || 'N/A'
      },
      {
        title: 'Related to Another Customer',
        content: customerResult.relcustid || 'N/A'
      },
      { title: 'Alert Type', content: customerResult.nextOfKinaddr || 'N/A' } // TODO: missing in reponse, report to infosight
    ]
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopActionsArea />
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <ShortCardWithViewDetailsAccordion
          cardTitle="Personal Details"
          accountInfo={
            ViewCustomerDetailsMapper.personalDetails as IViewAccountInfo[]
          }
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Business/Office/School Details"
          accountInfo={ViewCustomerDetailsMapper.businessDetails}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Next of Kin Details"
          accountInfo={ViewCustomerDetailsMapper.nextOfKinDetails}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Identification Details"
          accountInfo={ViewCustomerDetailsMapper.identificationDetails}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Referrer’s Details"
          accountInfo={ViewCustomerDetailsMapper.referrerDetails}
        />
      </Box>
    </Box>
  );
};
