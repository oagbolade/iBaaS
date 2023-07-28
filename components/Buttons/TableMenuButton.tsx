import React from 'react';
import Box from '@mui/material/Box';

type Props = {
  buttonTitle: string;
  icon: any;
};

export const TableMenuButton = ({ buttonTitle, icon }: Props) => {
  return (
    <Box
      sx={{
        padding: '10px',
        borderBottom: `1px solid #DCE0E6`,
        minWidth: '146px',
      }}
    >
      {icon}
       {buttonTitle}
    </Box>
  );
};
