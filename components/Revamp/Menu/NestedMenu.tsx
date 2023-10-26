import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NestedMenuItem } from 'mui-nested-menu';
import { Menu } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { SearchLoanFilters } from './SearchLoanFilters';

type Props = {
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
};

export const NestedMenu = ({ open, handleClose, anchorEl }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <NestedMenuItem label="Account Name" parentMenuOpen={open}>
          <SearchLoanFilters
            labels={[
              'All',
              'Loan Cancellation',
              'Loan Restructure',
              'Loan Underwriting',
              'Hotlist Account',
              'Partial Payoff',
            ]}
          />
        </NestedMenuItem>
        <NestedMenuItem label="Request Type" parentMenuOpen={open}>
          <SearchLoanFilters
            labels={[
              'All',
              'Cynthia Nwadike',
              'Chigozie Ndife',
              'Rebecca Tunde',
              'Tamarabibi Adams',
              'Azeez Babalola',
            ]}
          />
        </NestedMenuItem>
        <NestedMenuItem label="Date" parentMenuOpen={open}>
          <StaticDatePicker
            sx={{
              padding: '10px',
              '& .MuiPickersToolbar-root': {
                display: 'none',
              },
            }}
            defaultValue={dayjs('2022-04-17')}
          />
        </NestedMenuItem>
      </Menu>
    </LocalizationProvider>
  );
};
