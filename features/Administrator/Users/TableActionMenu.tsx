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
import colors from '@/assets/colors';
import { IUsers } from '@/api/ResponseTypes/admin';
import { getStoredUser } from '@/utils/user-storage';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  handleDelete: Function;
  userid: string;
  user: IUsers;
};

export const TableActionMenu = ({ handleDelete, userid, user }: Props) => {
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
  // eslint-disable-next-line no-unsafe-optional-chaining, no-redeclare
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
              href={`/admin/users/update/?isEditing=true&userid=${sanitize(userid)}`}
            >
              <TableMenuButton buttonTitle="Edit User" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              href={`/admin/users/reset/?userid=${sanitize(userid)}&fullname=${sanitize(user.fullname as string)}&roleId=${sanitize(user.role_id as string)}`}
            >
              <TableMenuButton buttonTitle="Reset User" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const step = 'isLockConfirmation';
              handleDelete(step, user);
            }}
          >
            <TableMenuButton
              buttonTitle={`${user.lockcount ? 'Unlock User' : 'Lock User'}`}
            />
          </MenuItem>
          <MenuItem
            data-testid="delete-user"
            onClick={() => {
              const step = 'isDeleteConfirmation';
              handleDelete(step, user);
            }}
          >
            <TableMenuButton
              customStyle={{ color: `${colors.primaryRedBase}` }}
              buttonTitle="Delete User"
            />
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
