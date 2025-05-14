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
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type Props = {
  customerId: string;
  accountNumber: string;
  productType: string;
  status: number;
};

export const CustomerAccountTableActionMenu = ({
  customerId,
  accountNumber,
  status,
  productType
}: Props) => {
  const shouldDisableEditAccount = !checkMultipleUserRoleAccess('Customer', 'EDIT ACCOUNT');
  const shouldDisableManageMandate = !checkMultipleUserRoleAccess('Customer', 'MANAGE MANDATE');
  const shouldDisableManageLien = !checkMultipleUserRoleAccess('Customer', 'MANAGE LIEN');
  const shouldDisableChequeBookEdit = !checkMultipleUserRoleAccess('Customer', 'CHECQUEBOOK  EDIT');
  const shouldDisableAccountReactivation = !checkMultipleUserRoleAccess('Customer', 'ACCOUNT REACTIVATION');
  const shouldDisableRangeCheque = !checkMultipleUserRoleAccess('Customer', 'RANGE CHEQUE');
  const shouldDisableCloseAccount = !checkMultipleUserRoleAccess('Customer', 'CLOSE ACCOUNT');
  const shouldDisableMoveCASAAccount = !checkMultipleUserRoleAccess('Customer', 'MOVE CASA ACCOUNT');

  const router = useRouter();
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dormantAccount = 2;

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
              style={{
                pointerEvents: (shouldDisableEditAccount) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableEditAccount}
              tabIndex={shouldDisableEditAccount ? -1 : undefined}
              href={`/customer-service/customer/create-account?isEditing=true&accountNumber=${sanitize(accountNumber)}`}
            >
              <TableMenuButton disabled={shouldDisableEditAccount} buttonTitle="Edit Account" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisableManageMandate) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableManageMandate}
              tabIndex={shouldDisableManageMandate ? -1 : undefined}
              href={`/customer-service/customer/mandate/view-mandate/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
            >
              <TableMenuButton disabled={shouldDisableManageMandate} buttonTitle="Manage Mandate" />
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisableManageLien) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableManageLien}
              tabIndex={shouldDisableManageLien ? -1 : undefined}
              href={`/customer-service/customer/lien/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
            >
              <TableMenuButton disabled={shouldDisableManageLien} buttonTitle="Manage Lien" />
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
                  style={{
                    pointerEvents: (shouldDisableChequeBookEdit) ? 'none' : 'auto',
                  }}
                  aria-disabled={shouldDisableChequeBookEdit}
                  tabIndex={shouldDisableChequeBookEdit ? -1 : undefined}
                  href={`/customer-service/customer/edit-chequebook/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
                >
                  <TableMenuButton disabled={shouldDisableChequeBookEdit} buttonTitle="Edit Chequebook" />
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  style={{
                    pointerEvents: (shouldDisableRangeCheque) ? 'none' : 'auto',
                  }}
                  aria-disabled={shouldDisableRangeCheque}
                  tabIndex={shouldDisableRangeCheque ? -1 : undefined}
                  href={`/customer-service/customer/range-cheque/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
                >
                  <TableMenuButton disabled={shouldDisableRangeCheque} buttonTitle="Range Cheque" />
                </Link>
              </MenuItem>
            </>
          )}
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisableMoveCASAAccount) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableMoveCASAAccount}
              tabIndex={shouldDisableMoveCASAAccount ? -1 : undefined}
              href={`/customer-service/customer/casa-account/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
            >
              <TableMenuButton disabled={shouldDisableMoveCASAAccount} buttonTitle="Move CASA" />
            </Link>
          </MenuItem>
          {status === dormantAccount && (
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <Link
                style={{
                  pointerEvents: (shouldDisableAccountReactivation) ? 'none' : 'auto',
                }}
                aria-disabled={shouldDisableAccountReactivation}
                tabIndex={shouldDisableAccountReactivation ? -1 : undefined}
                href={`/customer-service/customer/reactivate-account/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
              >
                <TableMenuButton disabled={shouldDisableAccountReactivation} buttonTitle="Reactivate Account" />
              </Link>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              return handleClose(null);
            }}
          >
            <Link
              style={{
                pointerEvents: (shouldDisableCloseAccount) ? 'none' : 'auto',
              }}
              aria-disabled={shouldDisableCloseAccount}
              tabIndex={shouldDisableCloseAccount ? -1 : undefined}
              href={`/customer-service/customer/close-account/?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(customerId)}`}
            >
              <TableMenuButton disabled={shouldDisableCloseAccount} buttonTitle="Close Account" />
            </Link>
          </MenuItem>
        </MenuWrapper>
      </StyledMenu>
    </Box>
  );
};
