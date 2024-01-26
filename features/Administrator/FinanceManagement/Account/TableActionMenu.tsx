import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';
import { StyledMenu } from '@/components/Table';
import colors from '@/assets/colors';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  handleDelete: Function;
};

export const TableActionMenu = ({ handleDelete }: Props) => {
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
            color: 'black',
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
            <Link href="/admin/users/reset">
              <TableMenuButton buttonTitle="Edit Account" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link href="/finance/account/classify">
              <TableMenuButton buttonTitle="Clasify Account" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Manage Mandate" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Edit Chequebook" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Range Cheque" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Reactivate Account" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Close Account" />
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
