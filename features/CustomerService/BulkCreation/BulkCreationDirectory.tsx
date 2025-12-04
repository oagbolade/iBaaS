/* eslint-disable no-nested-ternary */
'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { COLUMNS, fileData } from './COLUMN';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ChevronDown } from '@/assets/svg';
import { StyledMenu } from '@/components/Table';
import colors from '@/assets/colors';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

const FileNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const iconMap: { [key: string]: string } = {
    pdf: '📄',
    xlsx: '📊',
    xls: '📊',
    csv: '📋',
    doc: '📝',
    docx: '📝',
    txt: '📄',
    zip: '📦',
    json: '{ }',
    xml: '< >'
  };
  return iconMap[extension] || '📎';
};

const ActionMenuProps = () => {
  return (
    <button type="button" className=" text-[#0275D8]">
      View Details
    </button>
  );
};

export const BulkCustomerCreationDirectory = () => {
  const { setSearchParams, setSearchActive, page, setPage } =
    usePersistedSearch<ISearchParams>('customer-bulk-creation');

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const CreateBulkActions = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <button
          type="button"
          className="px-8 space-x-4 flex items-center bg-[#0275D8] py-2 rounded-lg text-white "
          onClick={handleClick}
        >
          <span className="mr-1 text-lg">Upload</span>
          <ChevronDown
            color={`${colors.white}`}
            props={{ width: '16px', height: '16px' }}
          />
        </button>

        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuWrapper>
            <MenuItem>
              <span>Customer</span>
            </MenuItem>

            <MenuItem>
              <span>Group</span>
            </MenuItem>

            <MenuItem>
              <span>Account</span>
            </MenuItem>

            <MenuItem>
              <span>Officers</span>
            </MenuItem>
          </MenuWrapper>
        </StyledMenu>
      </div>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '80px'
      }}
    >
      <div>
        <TopActionsArea actionButtons={[<CreateBulkActions />]} />
      </div>

      <Box sx={{ padding: '25px' }}>
        <FilterSection onSearch={handleSearch} />

        <MuiTableContainer
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'Bulk Creation',
            secondaryTitle:
              'This is an overview of all customers you have on this platform.'
          }}
          columns={COLUMNS}
          tableConfig={{
            hasActions: false
          }}
          data={fileData}
          totalPages={fileData.length / 10}
          totalElements={fileData.length}
          setPage={setPage}
          page={page}
        >
          {fileData?.map((dataItem: any, index: number) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <FileNameCell>
                    <span>{getFileIcon(dataItem.fileName)}</span>
                    <span>{dataItem.fileName}</span>
                  </FileNameCell>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dataItem.dateUploaded}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {dataItem.updateType}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {dataItem.fileSize}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {dataItem.uploadedBy}
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  <ActionMenuProps />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </MuiTableContainer>
      </Box>
    </Box>
  );
};
