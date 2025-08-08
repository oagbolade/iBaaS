'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { COLUMNS } from './COLUMNS';
import { FilterSection } from './FilterSection';
import { EndOfDayForm } from './EndOfDayForm';
import { RunEndOfDayForm } from './RunEndOfDay';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ISearchParams } from '@/app/api/search/route';

export const EndOfDaySetupTable = () => {
  const [openModel, setopenModel] = useState(Boolean);
  const [search, setSearch] = useState<boolean>(false);
  const [openRunModel, setopenRunModel] = useState(Boolean);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);

  const ActionMenu = ({
    exceptionCode
  }: {
    exceptionCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/product-gl/add-exception/?isEditing=true&id=${exceptionCode}`}
      >
        <TableSingleAction actionName="View Details" />
      </Link>
    );
  };
  const handleClose = () => {
    setopenModel(false);
    setopenRunModel(false);
  };
  const handleOpen = () => {
    setopenModel(true);
  };
  const handleRunOpen = () => {
    setopenRunModel(true);
  };
  const handleSearch = async (params: ISearchParams) => {
    setSearchParams({
      ...params
    });
    setSearch(true);
  };
  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Configure End of Day"
        customStyle={{ ...cancelButton }}
        onClick={handleOpen}
      />
      <PrimaryIconButton
        buttonTitle="Run End of Day"
        customStyle={{ ...submitButton }}
        onClick={handleRunOpen}
      />
      {openModel && (
        <ModalContainerV2 form={<EndOfDayForm handleClose={handleClose} />} />
      )}
      {openRunModel && (
        <ModalContainerV2
          form={<RunEndOfDayForm handleClose={handleClose} />}
        />
      )}
    </Box>
  ];

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        <FilterSection onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={COLUMNS}
          data={[]}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'End of Day Overview',
            secondaryTitle:
              'See a directory of all End of Day ran on this system.'
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
