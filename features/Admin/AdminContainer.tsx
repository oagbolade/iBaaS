'use client';
import React from 'react';
import Box from '@mui/material/Box';
import AdminContextProvider from './AdminContext';
import { MainSection, SearchSection } from '@/components/Shared';
import { MuiTableContainer } from '@/components/Table';
import { ModalContainer } from '@/components/Modal/index';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { RoleTitle } from '@/components/Typography';

type Props = {
  form: any;
  title: string;
  modalTitle?: string;
  buttonTitle: string;
  tableTitle: string;
  searchTitle: string;
  role?: any;
};

export const AdminContainer = (props: Props) => {
  return (
    <AdminContextProvider>
      <Box
        sx={{
          padding: '25px',
          width: '100%',
          marginTop: '80px',
        }}
      >
        <MainSection title={props.title} buttonTitle={props.buttonTitle} />
        {props.role === 'Role' ? (
          <Box sx={{ marginTop: { mobile: 4, tablet: 2 } }}>
            <RoleTitle roleTitle="Your Role:" title=" Global administrator " />
          </Box>
        ) : (
          <div />
        )}
        <SearchSection
          tableTitle={props.tableTitle}
          searchTitle={props.searchTitle}
        />

        <MuiTableContainer columns={MOCK_COLUMNS} data={MOCK_DATA} />
        <ModalContainer form={props.form} title={props.modalTitle} />
      </Box>
    </AdminContextProvider>
  );
};
