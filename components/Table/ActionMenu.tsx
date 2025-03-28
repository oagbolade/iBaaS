import React, { useContext } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StyledMenu } from './StyledMenu';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

type ActionMenuProps = {
  useDefault?: boolean;
  options?:
    | Array<{
        buttonTitle: string;
        icon?: React.ReactElement;
        link?: string;
        onClick?: () => void;
      }>
    | undefined;
};

export const ActionMenu: React.ComponentType<ActionMenuProps> = ({
  options,
  useDefault = true
}: ActionMenuProps) => {
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
    <Box
      sx={{
        padding: '25px'
      }}
    >
      <Button onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: 'black'
          }}
        />
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {useDefault ? (
          <MenuWrapper>
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <TableMenuButton
                buttonTitle="View Profile"
                icon={<RemoveRedEyeOutlinedIcon />}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                return handleClose(null);
              }}
            >
              <TableMenuButton buttonTitle="Edit" icon={<EditOutlinedIcon />} />
            </MenuItem>
          </MenuWrapper>
        ) : (
          options?.map((option) => {
            return (
              <MenuWrapper>
                <MenuItem
                  onClick={() => {
                    return option.onClick?.() || handleClose(option.link);
                  }}
                >
                  <Link href={option.link as string}>
                    <TableMenuButton
                      buttonTitle={option.buttonTitle}
                      icon={option.icon}
                    />
                  </Link>
                </MenuItem>
              </MenuWrapper>
            );
          })
        )}
      </StyledMenu>
    </Box>
  );
};
