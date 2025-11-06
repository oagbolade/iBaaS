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
import colors from '@/assets/colors';
import { IRoles } from '@/api/ResponseTypes/admin';
import { DeleteActionSteps } from '@/constants/Steps';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  handleDelete: Function;
  roleid: string;
  role: IRoles;
};

export const TableActionMenu = ({ handleDelete, roleid, role }: Props) => {
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
      <Button data-testid="view-actions" onClick={handleClick}>
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
              href={`/admin/roles/view?roleid=${DOMPurify.sanitize(roleid)}`}
            >
              <TableMenuButton buttonTitle="View Role" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/admin/roles/create?roleid=${DOMPurify.sanitize(roleid)}&isEditing=true`}
            >
              <TableMenuButton buttonTitle="Edit Role" />
            </Link>
          </MenuItem>
          <MenuItem
            data-testid="delete-role"
            onClick={() => {
              const step: DeleteActionSteps = 'isDeleteConfirmation';
              handleDelete(step, role);
            }}
          >
            <TableMenuButton
              customStyle={{ color: `${colors.primaryRedBase}` }}
              buttonTitle="Delete Role"
            />
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
