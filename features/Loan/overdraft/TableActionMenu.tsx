import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';
import { StyledMenu } from '@/components/Table';
import { encryptData } from '@/utils/encryptData';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  accountNumber: string;
  customerId: string;
  odNumber: string;
  odDetail: string;
};

export const TableActionMenu = ({
  accountNumber,
  customerId,
  odNumber,
  odDetail
}: Props) => {
  const detail = JSON.stringify(odDetail);
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
          <>
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <Link
                href={`/loan/overdrafts/view-single-overdraft?accountNumber=${DOMPurify.sanitize(accountNumber)}&customerId=${DOMPurify.sanitize(
                  customerId
                )}&odDetail=${detail}`}
              >
                <TableMenuButton buttonTitle="View Details" />
              </Link>
            </MenuItem>
            {JSON.parse(detail).status !== 'Expired' && (
              <>
                <MenuItem
                  onClick={() => {
                    return handleClose(null);
                  }}
                >
                  <Link
                    href={`/loan/overdrafts/set-overdraft?accountNumber=${DOMPurify.sanitize(accountNumber)}&customerId=${DOMPurify.sanitize(
                      customerId
                    )}&actionType=update&odDetail=${detail}`}
                  >
                    <TableMenuButton buttonTitle="Update Overdraft" />
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    return handleClose(null);
                  }}
                >
                  <Link
                    href={`/loan/overdrafts/terminate?accountNumber=${DOMPurify.sanitize(accountNumber)}&customerId=${DOMPurify.sanitize(
                      customerId
                    )}&odDetail=${detail}`}
                  >
                    <TableMenuButton buttonTitle="Terminate Overdraft" />
                  </Link>
                </MenuItem>
              </>
            )}
          </>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
