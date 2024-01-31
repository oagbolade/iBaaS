import React from 'react';
import { styled as muistyled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import styled from 'styled-components';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { MiniCard } from './MiniCard';
import '@/features/CustomerService/ShortCardWithAccordion/removeDivider.module.css';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';

const Accordion = muistyled((props: AccordionProps) => {
  return <MuiAccordion {...props} />;
})(() => {
  return {
    width: '100%', // uses 1117px in figma
    minHeight: '83px',
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none',
    marginBottom: '20px',
  };
});

const AccordionSummary = muistyled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props} />;
})(() => {
  return {
    cursor: 'pointer',
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '40px',
      padding: '20px 24px 5px 16px',
    },
  };
});

const AccordionDetails = muistyled(MuiAccordionDetails)(() => {
  return {
    padding: '20px 24px 30px 16px',
  };
});

export const AccordionWrapper = styled.section`
  hr {
    border: none; // To remove divider bug
  }
`;

interface accountInfo1 {
  customerName: string;
  title: string;
}
type Props = {
  cardTitle: string;
  accountInfo: accountInfo1[];
  titleName: string;
};

export const ShortCardWithViewDetailsAccordion = ({
  cardTitle,
  accountInfo,
  titleName,
}: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <AccordionWrapper>
      <Accordion expanded={expanded} onChange={() => handleChange()}>
        <AccordionSummary>
          <Stack
            ref={expandRef}
            direction="row"
            justifyContent="space-between"
            mt={2.8}
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                marginBottom: expanded ? '35px' : '15px',
                color: `${colors.neutral1000}`,
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '32px',
              }}
            >
              {cardTitle}
            </Typography>
            <Box
              sx={{
                marginBottom: expanded ? '35px' : '15px',
                transform: `${expanded ? 'rotate(180deg)' : 'none'}`,
              }}
              mt={1.2}
            >
              <ChevronDown color={`${colors.neutral900}`} />
            </Box>
          </Stack>
        </AccordionSummary>
        <Divider light />
        <AccordionDetails>
          <Grid container spacing={2}>
            {accountInfo.map((group) => (
              <MiniCard
                customerType={group.customerName}
                name={group.title}
                titles={titleName}
              />
            ))}{' '}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </AccordionWrapper>
  );
};
