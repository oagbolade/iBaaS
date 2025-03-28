import React, { useContext } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import { StyledMenu } from './StyledMenu';
import { TableMenuButton } from '@/components/Buttons';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';

type ActionMenuProps = {
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
  options
}: ActionMenuProps) => {
  const router = useRouter();
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link: string | null | object = null) => {
    if (link) router.push(link as string);
    const isEditing = true;
    toggleCustomerServiceModal(isEditing);
    setAnchorEl(null);
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
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          return handleClose(null);
        }}
      >
        {options?.map((option) => {
          return (
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
          );
        })}
      </StyledMenu>
    </Box>
  );
};
