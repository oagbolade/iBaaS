'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { MainSection, SearchSection } from '@/components/Shared';
import { MuiTableContainer } from '@/components/Table';
import { ModalContainer } from '@/components/Modal/index';
import CustomerServiceProvider from './CustomerServiceContext';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';

type Props = {
  form: any;
  searchFilters?: any;
  title: string;
  modalTitle?: string;
  buttonTitle?: string;
  tableTitle: string;
  searchTitle: string;
  isLien?: boolean;
  isCustomerCreation?: boolean;
  isOfficerTransfer?: boolean;
  isAccountRecord?: boolean;
};

export const CustomerServiceContainer = (props: Props) => {
  return (
    <CustomerServiceProvider>
      <Box
        sx={{
          padding: '25px',
          width: '100%',
          marginTop: '80px',
        }}
      >
        <MainSection
          isOfficerTransfer={props.isOfficerTransfer}
          isLien={props.isLien}
          isCustomerService
          title={props.title}
          buttonTitle={props.buttonTitle}
        />
        <SearchSection
          tableTitle={props.tableTitle}
          searchTitle={props.searchTitle}
          searchFilters={props.searchFilters}
        />
        <MuiTableContainer columns={MOCK_COLUMNS} data={MOCK_DATA} />
        <ModalContainer
          isCustomerCreation={props.isCustomerCreation}
          isAccountRecord={props.isAccountRecord}
          form={props.form}
          title={props.modalTitle}
        />
      </Box>
    </CustomerServiceProvider>
  );
};
