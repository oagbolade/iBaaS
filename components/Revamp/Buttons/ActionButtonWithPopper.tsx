import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { actionButtonTypography } from './styles';
import { CustomStyleI } from '@/constants/types';
import colors from '@/assets/colors';

type Props = {
  buttonTitle?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  iconPosition?: 'end' | 'start';
  onClick?: () => void | undefined | number;
  customStyle?: CustomStyleI;
  options: Array<string>;
};

export const ActionButtonWithPopper = ({
  buttonTitle,
  icon,
  iconPosition,
  customStyle,
  onClick,
  type,
  options,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => {return !prevOpen;});
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          id="action-button"
          type={type}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ ...actionButtonTypography, ...customStyle }}
          style={{
            backgroundColor:
              customStyle?.backgroundColor || `${colors.primaryBlue100}`,
            border: customStyle?.border || `1px solid ${colors.primaryBlue500}`,
          }}
          variant={customStyle?.variant}
          startIcon={iconPosition === 'start' && icon}
          endIcon={iconPosition === 'end' && icon}
        >
          {buttonTitle}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          marginRight: '20px',
          zIndex: 1,
          boxShadow:
            '0px 5px 15px 0px rgba(0, 0, 0, 0.08), 0px 15px 35px -5px rgba(17, 24, 38, 0.15), 0px 0px 0px 1px rgba(152, 161, 178, 0.10)',
          borderRadius: '6px',
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => {return (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => {return (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => {return handleMenuItemClick(event, index);}} // todo: use onClick={() => onClick?.()}
                    >
                      {option}
                    </MenuItem>
                  );})}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        );}}
      </Popper>
    </>
  );
};
