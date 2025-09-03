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

import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';

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

  const [shouldDisable, setShouldDisable] = React.useState({
    view: false,
    cancel: false,
    terminate: false,
    partialPayOff: false,
    restructLaon: false
  });

  const handleClose = (link: string | null = null) => {
    if (link) router.push(link || '');
    const isEditing = true;
    toggleCustomerServiceModal(isEditing);
    setAnchorEl(null);
    handleMenuClose();
  };

  React.useEffect(() => {
    const shouldDisableView = !checkMultipleUserRoleAccess(
      'Loan Directory',
      'VIEW LOAN APPLICATION'
    );
    const shouldDisableCancel = !checkMultipleUserRoleAccess(
      'Loan Directory',
      'CANCEL LOAN'
    );

    const shouldDisableTerminate = !checkMultipleUserRoleAccess(
      'Loan Directory',
      'LOAN CLOSURE_WRITEOFF'
    );

    const shouldDisablePartailPayOff = !checkMultipleUserRoleAccess(
      'Loan Directory',
      'PARTIAL PAYOFF'
    );

    const shouldDisableRestructure = !checkMultipleUserRoleAccess(
      'Loan Directory',
      'LOAN RESTRUCTURE'
    );

    setShouldDisable((prev) => ({
      ...prev,
      view: shouldDisableView,
      cancel: shouldDisableCancel,
      terminate: shouldDisableTerminate,
      partialPayOff: shouldDisablePartailPayOff,
      restructLaon: shouldDisableRestructure
    }));
  }, []);

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
                pointerEvents: shouldDisable.view ? 'none' : 'auto'
              }}
              aria-disabled={shouldDisable.view}
              tabIndex={shouldDisable.view ? -1 : undefined}
              href={`/loan/loan-directory/view-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}&productCode=${sanitize(productCode)}`}
            >
              <TableMenuButton buttonTitle="View Loan" />
            </Link>
          </MenuItem>

          {status === '1' && (
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <Link
                style={{
                  pointerEvents: shouldDisable.view ? 'none' : 'auto'
                }}
                aria-disabled={shouldDisable.view}
                tabIndex={shouldDisable.view ? -1 : undefined}
                href={`/loan/loan-directory/disburse-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}&productCode=${sanitize(productCode)}`}
              >
                <TableMenuButton buttonTitle="Disburse Loan" />
              </Link>
            </MenuItem>
          )}

          {status === '4' && (
            <>
              <MenuItem
                onClick={() => {
                  return handleClose(null);
                }}
              >
                <Link
                  style={{
                    pointerEvents: shouldDisable.terminate ? 'none' : 'auto'
                  }}
                  aria-disabled={shouldDisable.terminate}
                  tabIndex={shouldDisable.terminate ? -1 : undefined}
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
                  style={{
                    pointerEvents: shouldDisable.partialPayOff ? 'none' : 'auto'
                  }}
                  aria-disabled={shouldDisable.partialPayOff}
                  tabIndex={shouldDisable.partialPayOff ? -1 : undefined}
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
                  style={{
                    pointerEvents: shouldDisable.restructLaon ? 'none' : 'auto'
                  }}
                  aria-disabled={shouldDisable.restructLaon}
                  tabIndex={shouldDisable.restructLaon ? -1 : undefined}
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
