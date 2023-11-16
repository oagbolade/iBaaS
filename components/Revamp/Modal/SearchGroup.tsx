import React from 'react';
import { Button, Grid, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';
import {
  textTitle,
  SelectedText,
  OptionsItemStyle,
  OptionsStyleContainer,
  modalTitleContainer,
  modalContainer,
  modalTitle,
  modalTitleStyle,
  modalTyopgraphy,
  modalBodyContainer,
  modalBody,
  textTypography,
  text,
  textField,
  optionsTextStyle,
  optionsText,
} from '../FormFields/style';
import { LoanAccountIcon } from '@/assets/svg';

interface OptionsI {
  name: string;
  value: string;
  Id: string;
}

type Props = {
  label?: string;
  name: string;
  icon?: string;
  options: OptionsI[];
  customStyle?: object;
  placeholder?: string;
};

const IconSelct = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => {
    return setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Button sx={{ marginLeft: '190px' }} onClick={handleOpen}>
          <LoanAccountIcon />
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalContainer}>
            <Box sx={modalTitleContainer}>
              <Box sx={modalTitle}>
                <Box sx={modalTitleStyle}>
                  <Typography sx={modalTyopgraphy}>Loan Account</Typography>
                  <Close />
                </Box>
              </Box>
              <Box sx={modalBodyContainer}>
                <Box sx={modalBody}>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Group Address</Typography>
                    <Typography sx={textField}>Loan Account</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Group Amount Limit</Typography>
                    <Typography sx={textField}>₦32,543,432,53</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Participation Limit</Typography>
                    <Typography sx={textField}>₦1,893,224.53</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Group Active Members</Typography>
                    <Typography sx={textField}>53</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Contact Person</Typography>
                    <Typography sx={textField}>Omodayo Oluwafunke</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Group Member Limit</Typography>
                    <Typography sx={textField}>₦700,000</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Group Amount Used</Typography>
                    <Typography sx={textField}>₦453,380.96</Typography>
                  </Box>
                  <Box sx={textTypography}>
                    <Typography sx={text}>Branch</Typography>
                    <Typography sx={textField}>Head Office</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export const FormSelect = ({
  label,
  name,
  icon,
  options,
  placeholder,
  customStyle,
}: Props) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  const handleDelete = () => {
    setValue('');
  };
  return (
    <Box>
      <Stack sx={{ marginBottom: '15px' }} direction="row">
        <Typography sx={textTitle}>{label}</Typography>
      </Stack>
      <Select
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        sx={SelectedText}
        style={{ ...customStyle }}
        inputProps={{
          name,
        }}
        IconComponent={() => {
          return (
            <>
              {value ? <IconSelct /> : <SearchIcon />}
              {value && (
                <Button onClick={handleDelete} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </Button>
              )}
            </>
          );
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.name} value={option.value}>
              <Box key={option.name} sx={OptionsStyleContainer}>
                <Grid key={option.name} sx={OptionsItemStyle}>
                  <Typography key={option.name} sx={optionsText}>
                    {option.name}
                  </Typography>
                  <Typography sx={optionsTextStyle} key={option.name}>
                    {option.Id}
                  </Typography>
                </Grid>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
