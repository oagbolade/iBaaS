import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  AccordionDetails as MuiAccordionDetails,
  Box,
  Typography,
  styled
} from '@mui/material';
import colors from '@/assets/colors';

export const Accordion = styled((props: MuiAccordionProps) => {
  return <MuiAccordion disableGutters square {...props} />;
})(() => {
  return {
    borderRadius: '12px',
    marginLeft: '20px',
    marginRight: '20px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none'
  };
});

export const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props} />;
})(({ theme }) => {
  return {
    background: '#F9FBFC',
    cursor: 'pointer',
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center'
    }
  };
});

export const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: 0
  };
});

export const SubTitle = ({ title }: { title?: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        textTransform: 'uppercase'
      }}
    >
      {title}
    </Typography>
  );
};

export const Details = ({ title }: { title?: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral900}`,
        fontSize: { mobile: '12px', desktop: '16px' },
        fontWeight: 600,
        lineHeight: '24px',
        marginBottom: '24px'
      }}
    >
      {title}
    </Typography>
  );
};
