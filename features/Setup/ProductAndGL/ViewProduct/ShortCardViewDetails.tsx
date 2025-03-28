import React from 'react';
import { styled as muistyled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import styled from 'styled-components';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { MiniCard } from '@/features/CustomerService/Customer/ViewDetails/MiniCard';

const Accordion = muistyled((props: AccordionProps) => {
  return <MuiAccordion {...props} />;
})(() => {
  return {
    width: '100%', // uses 1117px in figma
    minHeight: '83px',
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none',
    marginBottom: '20px'
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
      padding: '20px 24px 5px 16px'
    }
  };
});

const AccordionDetails = muistyled(MuiAccordionDetails)(() => {
  return {
    padding: '20px 24px 30px 16px'
  };
});

export const AccordionWrapper = styled.section`
  hr {
    border: none; // To remove divider bug
  }
`;

export interface IViewProductInfo {
  title: string;
  content: string;
}

type Props = {
  cardTitle: string;
  productInfoDetails?: IViewProductInfo[];
};

export const ShortCardWithViewDetailsAccordion = ({
  cardTitle,
  productInfoDetails
}: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mb={2}>
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
                  lineHeight: '32px'
                }}
              >
                {cardTitle}
              </Typography>
              <Box
                sx={{
                  marginBottom: expanded ? '35px' : '15px',
                  transform: `${expanded ? 'rotate(180deg)' : 'none'}`
                }}
                mt={1.2}
              >
                <ChevronDown color={`${colors.neutral900}`} />
              </Box>
            </Stack>
          </AccordionSummary>
          <Divider light />
          <AccordionDetails>
            <Box
              sx={{
                padding: '24px',
                alignItems: 'flex-start',
                borderRadius: '5px',
                border: `1px solid ${colors.neutral300}`,
                background: `${colors.white}`,
                width: { mobile: '450px', tablet: 'auto' },
                height: { mobile: '170px', tablet: '100%' }
              }}
            >
              <Grid container spacing={2}>
                {productInfoDetails?.map((info) => (
                  <Grid item mobile={6} tablet={3}>
                    <MiniCard title={info.title} content={info.content} />
                  </Grid>
                ))}{' '}
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionWrapper>
    </Box>
  );
};
