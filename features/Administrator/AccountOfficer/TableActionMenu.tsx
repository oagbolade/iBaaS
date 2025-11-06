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
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { DeleteActionSteps } from '@/constants/Steps';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  handleDelete: Function;
  officercode: string;
  officer: IAccountOfficers;
};

export const TableActionMenu = ({
  handleDelete,
  officercode,
  officer
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
              href={`/admin/account-officers/view?officerCode=${DOMPurify.sanitize(officercode)}`}
            >
              <TableMenuButton buttonTitle="View" />
            </Link>
          </MenuItem>
          {Number(officer?.status) !== 3 && (
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <Link
                href={`/admin/account-officers/create/?officercode=${DOMPurify.sanitize(officercode.trim())}&isEditing=true`}
              >
                <TableMenuButton buttonTitle="Edit" />
              </Link>
            </MenuItem>
          )}

          {/* Deactivate happens on the edit screen */}
          {/* <MenuItem
            onClick={() => {
              handleDelete('isDeactivateConfirmation');
              return handleClose(null);
            }}
          >
            <TableMenuButton buttonTitle="Deactivate Officer" />
          </MenuItem> */}
          {Number(officer?.status) !== 3 && (
            <MenuItem
              data-testid="delete-officer"
              onClick={() => {
                const step: DeleteActionSteps = 'isDeleteConfirmation';
                handleDelete(step, officer);
              }}
            >
              <TableMenuButton
                customStyle={{ color: `${colors.primaryRedBase}` }}
                buttonTitle="Delete Officer"
              />
            </MenuItem>
          )}
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
