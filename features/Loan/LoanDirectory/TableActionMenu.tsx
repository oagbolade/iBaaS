import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import { sanitize } from 'dompurify';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';
import { StyledMenu } from '@/components/Table';
import { useGetStatus } from '@/api/general/useStatus';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  status: string;
  accountNumber: string;
  settlementAccount: string;
  productCode: string;
  customerId: string;
};

export const TableActionMenu = ({
  status,
  accountNumber,
  settlementAccount,
  productCode,
  customerId
}: Props) => {
  const router = useRouter();
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClose = (link: string | null = null) => {
    if (link) router.push(link || '');
    const isEditing = true;
    toggleCustomerServiceModal(isEditing);
    setAnchorEl(null);
    handleMenuClose();
  };

  return (
    <Box>
      <Button onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: 'black'
          }}
        />
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuWrapper>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/loan/loan-directory/view-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}&productCode=${sanitize(productCode)}`}
            >
              <TableMenuButton buttonTitle="View Loan" />
            </Link>
          </MenuItem>

          {status !== '3' && (
            <>
              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/loan/loan-directory/cancel-loan/?accountNumber=${accountNumber as string}&action=${sanitize(status)}&customerId=${sanitize(customerId)}`}
                >
                  <TableMenuButton buttonTitle="Cancel Loan" />
                </Link>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/loan/loan-directory/terminate-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}`}
                >
                  <TableMenuButton buttonTitle="Terminate Loan" />
                </Link>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/loan/loan-directory/partial-pay/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}`}
                >
                  <TableMenuButton buttonTitle="Partial Pay" />
                </Link>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/loan/loan-directory/restructure-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}&productCode=${sanitize(productCode)}`}
                >
                  <TableMenuButton buttonTitle="Restructure Loan" />
                </Link>
              </MenuItem>
            </>
          )}
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
