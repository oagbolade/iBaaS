import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRouter } from 'next/navigation';
import { StyledMenu } from './StyledMenu';
import { TableMenuButton } from '@/components/Buttons';
import { AdminContext } from '@/features/Admin-old/AdminContext';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';

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
  useDefault = true,
}: ActionMenuProps) => {
  const router = useRouter();
  const { toggleModal } = useContext(AdminContext);
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link: string | null | object = null) => {
    if (link) router.push(link as string);
    const isEditing = true;
    toggleModal(isEditing);
    toggleCustomerServiceModal(isEditing);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        padding: '25px',
      }}
    >
      <Button onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: 'black',
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
        {useDefault ? (
          <div>
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
          </div>
        ) : (
          options?.map((option) => {
            return (
              <MenuItem
                onClick={() => {
                  return option.onClick?.() || handleClose(option.link);
                }}
              >
                <TableMenuButton
                  buttonTitle={option.buttonTitle}
                  icon={option.icon}
                />
              </MenuItem>
            );
          })
        )}
      </StyledMenu>
    </Box>
  );
};
