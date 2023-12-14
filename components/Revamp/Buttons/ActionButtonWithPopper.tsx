import React from 'react';
import { Button, ButtonGroup, Paper } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { actionButtonTypography } from './styles';
import { DateRangePicker } from '@/components/Revamp/FormFields/DateRangePicker';
import {
  BasicSearchGroup,
  CheckBoxSearchGroup,
  ExportData,
} from '@/components/Revamp/Menu/SearchGroupVariants';
import { CustomStyleI } from '@/constants/types';
import colors from '@/assets/colors';

type Props = {
  buttonTitle?: string;
  controlOpening?: boolean | null;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  iconPosition?: 'end' | 'start';
  onClick?: () => void | undefined | number;
  customStyle?: CustomStyleI;
  options?: Array<string>;
  searchGroupVariant?:
    | 'Default'
    | 'BasicSearchGroup'
    | 'CheckBoxSearchGroup'
    | 'ExportReport'
    | 'DateRangePicker'
    | undefined;
};

type SearchGroupMapperType = {
  BasicSearchGroup: React.ReactNode;
  CheckBoxSearchGroup: React.ReactNode;
  ExportReport: React.ReactNode;
  DateRangePicker: React.ReactNode;
  Default: React.ReactNode;
};

export const ActionButtonWithPopper = ({
  buttonTitle,
  icon,
  iconPosition,
  customStyle,
  searchGroupVariant = 'Default',
  type,
  options,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => {
      return !prevOpen;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RenderMenuVariant = ({
    variant,
  }: {
    variant: keyof SearchGroupMapperType;
  }): React.ReactNode => {
    const SearchGroupMapper: SearchGroupMapperType = {
      BasicSearchGroup: (
        <BasicSearchGroup
          handleClose={handleClose}
          options={options}
          handleMenuItemClick={handleMenuItemClick}
        />
      ),
      CheckBoxSearchGroup: (
        <CheckBoxSearchGroup handleClose={handleClose} options={options} />
      ),
      ExportReport: <ExportData handleClose={handleClose} />,
      DateRangePicker: <DateRangePicker handleClose={handleClose} />,
      Default: (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ width: 240, maxWidth: '100%' }}>
            <MenuList id="split-button-menu" autoFocusItem>
              {options?.map((option, index) => {
                return (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => {
                      return handleMenuItemClick(event, index);
                    }}
                  >
                    {option}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </ClickAwayListener>
      ),
    };

    return SearchGroupMapper[variant];
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ boxShadow: 'none' }}
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
          marginTop: '10px !important',
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
        {({ TransitionProps, placement }) => {
          return (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <RenderMenuVariant variant={searchGroupVariant} />
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </>
  );
};
