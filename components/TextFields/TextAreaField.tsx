import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { labelTypography, textArea } from './styles';
import { TextAreaIcon } from '@/assets/svg';

type Props = {
  label: string;
  title: string;
  placeholder: string;
};

export const TextFieldArea = ({ label, title, placeholder }: Props) => {
  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Stack
        sx={{
          marginBottom: '10px',
        }}
      >
        <Typography sx={labelTypography}>{label}</Typography>
        <TextField
          placeholder={placeholder}
          multiline
          rows={4}
          title={title}
          sx={textArea}
        />
      </Stack>
    </Box>
  );
};
