import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TableMenuButton } from '@/components/Buttons';
import { StyledMenu } from './StyledMenu';
import { AdminContext } from '@/features/Admin/AdminContext';

export const ActionMenu = () => {
  const { toggleModal } = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    const isEditing = true;
    toggleModal(isEditing);
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
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <TableMenuButton
            buttonTitle="View Profile"
            icon={<RemoveRedEyeOutlinedIcon />}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TableMenuButton buttonTitle="Edit" icon={<EditOutlinedIcon />} />
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
