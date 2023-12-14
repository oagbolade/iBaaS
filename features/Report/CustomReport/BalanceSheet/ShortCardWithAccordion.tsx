import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Stack, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AccordionWrapper } from '../GroupReport/ShortCardWithAccordion';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { TextInput } from '@/components/FormikFields';
import { AssetsTable, IData } from '@/components/Table/AssetsTable';

const Accordion = styled((props: AccordionProps) => {
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

const AccordionSummary = styled((props: AccordionSummaryProps) => {
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

const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: '20px 24px 30px 16px',
  };
});

const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
      }}
    >
      {title}
    </Typography>
  );
};

const Value = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '24px',
      }}
    >
      {title}
    </Typography>
  );
};

type Props = {
  column: Array<string>;
  data: IData[];
};

export const ShortCardWithAccordion = ({ column, data }: Props) => {
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
                color: `${colors.neutral1000}`,
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '32px',
              }}
            >
              Assets
            </Typography>
            <Box mb={3}>
              <Stack>
                <Title title="Number of Assets" />
                <Value title="7,543" />
              </Stack>
            </Box>
            <Box>
              <Stack>
                <Title title="Value" />
                <Value title="N13,543,789.54" />
              </Stack>
            </Box>
            <Box
              sx={{
                marginBottom: expanded ? '35px' : 0,
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
          <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
            <TextInput
              name="Search"
              placeholder="Search"
              icon={<SearchIcon />}
            />
          </Box>
          <AssetsTable
            tableConfig={{
              paintedColumns: ['Assets', 'Amount'],
              totalRow: ['Total', 'N12,563,090,587.65'],
            }}
            columns={column}
            data={data}
          />
        </AccordionDetails>
      </Accordion>
    </AccordionWrapper>
  );
};
