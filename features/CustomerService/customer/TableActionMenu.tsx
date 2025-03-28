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
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  customerId: string;
};

export const TableActionMenu = ({ customerId }: Props) => {
  const shouldDisableEdit = !checkMultipleUserRoleAccess('Customer', 'EDIT CUSTOMER');
  const shouldDisableView = !checkMultipleUserRoleAccess('Customer', 'CUSTOMER INFO');

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
              style={{
                pointerEvents: (shouldDisableEdit) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableEdit}
              tabIndex={shouldDisableEdit ? -1 : undefined}
              href={`/customer-service/customer/create-customer/?isEditing=true&customerId=${customerId}`}
            >
              <TableMenuButton disabled={shouldDisableEdit} buttonTitle="Edit Customer" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisableView) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableView}
              tabIndex={shouldDisableView ? -1 : undefined}
              href={`/customer-service/customer/view-customer-details/?customerId=${customerId}`}
            >
              <TableMenuButton disabled={shouldDisableView} buttonTitle="View Details" />
            </Link>
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
