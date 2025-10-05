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
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  groupId: string;
};

export const TableActionMenu = ({ groupId }: Props) => {
  const shouldDisable = !checkMultipleUserRoleAccess('Groups', 'MANAGE GROUP MEMBERS');
  const shouldDisableView = !checkMultipleUserRoleAccess('Groups', 'MANAGE GROUPS');

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
                pointerEvents: (shouldDisableView) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableView}
              tabIndex={shouldDisableView ? -1 : undefined}
              href={`/customer-service/group/view-group/?groupId=${DOMPurify.sanitize(groupId)}`}
            >
              <TableMenuButton disabled={shouldDisableView} buttonTitle="View Details" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisable) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisable}
              tabIndex={shouldDisable ? -1 : undefined}
              href={`/customer-service/group/add-group-member?groupId=${DOMPurify.sanitize(groupId)}`}
            >
              <TableMenuButton disabled={shouldDisable} buttonTitle="Add group members" />
            </Link>
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
