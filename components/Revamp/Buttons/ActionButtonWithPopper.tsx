import React from 'react';
import {
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Typography,
  Box
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { actionButtonTypography } from './styles';
import { DateRangePicker as DateRangePickerComponent } from '@/components/Revamp/FormFields/DateRangePicker';
import {
  BasicSearchGroup,
  CheckBoxSearchGroup,
  ExportData,
  LoanCustomerSearch,
  GlSearchGroup
} from '@/components/Revamp/Menu/SearchGroupVariants';

import { CustomStyleI } from '@/constants/types';
import colors from '@/assets/colors';
import { asterix, labelTypography } from '@/components/FormikFields/styles';
import { OptionsI } from '@/components/FormikFields/FormSelectField';

type Props = {
  CustomDateRangePicker?: React.ReactNode;
  buttonTitle?: string;
  controlOpening?: boolean | null;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: any;
  iconPosition?: 'end' | 'start';
  onClick?: () => void | undefined | number;
  customStyle?: CustomStyleI;
  dropDownOptions?: OptionsI[];
  loanDropDownOptions?: any;
  options?: string[];
  searchGroupVariant?:
    | 'Default'
    | 'LoanCustomerSearch'
    | 'GLSearchGroup'
    | 'BasicSearchGroup'
    | 'CheckBoxSearchGroup'
    | 'ExportReport'
    | 'DateRangePicker'
    | undefined;
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: Function;
  handleSelectedValue?: Function;
  searchValue?: string;
  name?: string;
  dateRangeValue?: any;
  setDateRangeValue?: any;
};

type SearchGroupMapperType = {
  LoanCustomerSearch: React.ReactNode;
  GLSearchGroup: React.ReactNode;
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
  dropDownOptions,
  loanDropDownOptions,
  label,
  required,
  onChange,
  searchValue,
  name = '',
  handleSelectedValue,
  loading,
  disabled,
  CustomDateRangePicker
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (
    event:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value?: string
  ) => {
    setSelectedIndex(index);
    handleSelectedValue?.(value);
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
    variant
  }: {
    variant: keyof SearchGroupMapperType;
  }): React.ReactNode => {
    const SearchGroupMapper: SearchGroupMapperType = {
      LoanCustomerSearch: (
        <LoanCustomerSearch
          handleClose={handleClose}
          options={loanDropDownOptions}
          handleMenuItemClick={handleMenuItemClick}
          onChange={onChange}
          searchValue={searchValue}
          name={name}
          autoFocus
          loading={loading}
        />
      ),

      GLSearchGroup: (
        <GlSearchGroup
          handleClose={handleClose}
          options={dropDownOptions}
          handleMenuItemClick={handleMenuItemClick}
          onChange={onChange}
          searchValue={searchValue}
          name={name}
          autoFocus
          loading={loading}
        />
      ),

      BasicSearchGroup: (
        <BasicSearchGroup
          handleClose={handleClose}
          options={dropDownOptions}
          handleMenuItemClick={handleMenuItemClick}
          onChange={onChange}
          searchValue={searchValue}
          name={name}
          autoFocus
          loading={loading}
        />
      ),
      CheckBoxSearchGroup: (
        <CheckBoxSearchGroup handleClose={handleClose} options={options} />
      ),
      ExportReport: <ExportData handleClose={handleClose} />,
      DateRangePicker: (
        <DateRangePickerComponent
          CustomDateRangePicker={CustomDateRangePicker}
          handleClose={handleClose}
        />
      ),
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
      )
    };

    return SearchGroupMapper[variant];
  };

  return (
    <>
      {label && (
        <Stack
          sx={{
            marginBottom: '3px'
          }}
          direction="row"
        >
          <Typography sx={labelTypography}>{label} </Typography>
          {required && <Typography sx={asterix}>*</Typography>}
        </Stack>
      )}
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ boxShadow: 'none' }}
      >
        <Button
          type={type}
          size="small"
          onClick={handleToggle}
          sx={{ ...actionButtonTypography, ...customStyle }}
          style={{
            backgroundColor: disabled
              ? `${colors.neutral300}`
              : customStyle?.backgroundColor || `${colors.primaryBlue100}`,
            border: disabled
              ? `1px solid ${colors.neutral300}`
              : customStyle?.border || `1px solid ${colors.primaryBlue500}`
          }}
          variant={customStyle?.variant}
          startIcon={iconPosition === 'start' && icon}
          endIcon={iconPosition === 'end' && icon}
        >
          {buttonTitle}
        </Button>
      </ButtonGroup>
      {disabled ? null : (
        <Popper
          sx={{
            marginTop: '10px !important',
            zIndex: 9,
            boxShadow:
              '0px 5px 15px 0px rgba(0, 0, 0, 0.08), 0px 15px 35px -5px rgba(17, 24, 38, 0.15), 0px 0px 0px 1px rgba(152, 161, 178, 0.10)',
            borderRadius: '6px'
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
                    placement === 'bottom' ? 'center top' : 'center bottom'
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
      )}
      <Box mb={1.5} />
    </>
  );
};
