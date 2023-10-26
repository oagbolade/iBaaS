'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import { useCurrentBreakpoint } from '@/utils';
import Grid from '@mui/material/Grid';

type Props = {
  title: string;
  description: string;
  value: string;
  icon: any;
};

export const CustomerAccountType = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
  };

  return (
    <Box
      sx={{
        borderRadius: '8px',
        border: '1px solid var(--neutrals-text-neutral-400, #C8D2DF)',
        display: 'flex',
        padding: '24px',
        gap: '20px',
        marginBottom: '10px',
      }}
    >
      <Stack direction={setDirction()} spacing={3}>
        {props.icon}
        <Box>
          <Typography
            sx={{
              color: 'var(--neutrals-text-neutral-900, #353F50)',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px',
            }}
          >
            {props.title}
          </Typography>
          <Typography
            sx={{
              color: 'var(--neutrals-text-neutral-700, #5F738C)',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              maxWidth: '395px',
              height: '40px',
              whiteSpace: 'break-spaces',
            }}
          >
            {props.description}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            bottom: 8,
            
          }}
        >
          <Grid
            item={isTablet}
            mobile={12}
            container={isMobile}
            tablet={6}
            height={{ mobile: 20, tablet: 0 }}
            width={{ mobile: 25, tablet: 0 }}
            ml={{ mobile: 25, tablet: 0 }}
            position={{mobile: "relative", desktop: "relative", tablet: "relative"}}
            top={{mobile: -87, tablet: -1}}
            mr={{mobile: 5, tablet: 9}}

          >
            <Radio
              checked={selectedValue === props.value}
              onChange={handleChange}
              value={selectedValue || props.value}
              name="customerType"
            />
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};
