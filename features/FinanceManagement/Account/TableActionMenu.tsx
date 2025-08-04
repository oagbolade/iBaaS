import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import DOMPurify, { sanitize } from 'dompurify';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';
import { StyledMenu } from '@/components/Table';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  customerId: string;
  accountNumber: string;
  status: number;
  urlState: string;
  productType: string;
};

export const TableActionMenu = ({
  customerId,
  accountNumber,
  status,
  urlState,
  productType
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

  const isCurrentAccount = productType.search(/current/i) !== -1;

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
              href={`/customer-service/customer/create-account?isEditing=true&accountNumber=${DOMPurify.sanitize(accountNumber)}&urlState=${urlState}`}
            >
              <TableMenuButton buttonTitle="Edit Account" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/finance/account/classify?accountNumber=${DOMPurify.sanitize(accountNumber)}&urlState=${urlState}`}
            >
              <TableMenuButton buttonTitle="Classify Account" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/customer-service/customer/mandate/view-mandate/?accountNumber=${DOMPurify.sanitize(accountNumber)}&customerId=${DOMPurify.sanitize(customerId)}&urlState=${urlState}`}
            >
              <TableMenuButton buttonTitle="Manage Mandate" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/customer-service/customer/lien/?accountNumber=${DOMPurify.sanitize(accountNumber)}&customerId=${DOMPurify.sanitize(customerId)}&urlState=${urlState}`}
            >
              <TableMenuButton buttonTitle="Manage Lien" />
            </Link>
          </MenuItem>

          {isCurrentAccount && (
            <>
              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/customer-service/customer/edit-chequebook/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}&urlState=${urlState}`}
                >
                  <TableMenuButton buttonTitle="Edit Chequebook" />
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  href={`/customer-service/customer/range-cheque/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}&urlState=${urlState}`}
                >
                  <TableMenuButton buttonTitle="Range Cheque" />
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            {status === 1 ? (
              <Link
                href={`/customer-service/customer/close-account/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}&urlState=${urlState}`}
              >
                <TableMenuButton buttonTitle="Close Account" />
              </Link>
            ) : (
              <Link
                href={`/customer-service/customer/reactivate-account/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}&urlState=${urlState}`}
              >
                <TableMenuButton buttonTitle="Reactivate Account" />
              </Link>
            )}
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
