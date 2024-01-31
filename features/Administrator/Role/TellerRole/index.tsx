'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Stack, Grid } from '@mui/material';
import AnimateHeight, { Height } from 'react-animate-height';
// eslint-disable-next-line import/no-cycle
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/useSetDirection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { CheckboxInput } from '@/components/FormikFields';

const Accordion = styled((props: AccordionProps) => {
  return (
    <MuiAccordion
      disableGutters
      square
      {...props}
      sx={{ border: '1px solid red' }}
    />
  );
})(() => {
  return {
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none',
  };
});

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props} />;
})(({ theme }) => {
  return {
    background: '#F9FBFC',
    cursor: 'pointer',
    borderTop: `1px solid ${colors.neutral300}`,
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
    },
  };
});

const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: 0,
  };
});

type Props = {
  title?: string;
};
export const SubTitle = ({ title }: Props) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        textTransform: 'uppercase',
      }}
    >
      {title}
    </Typography>
  );
};

export const Details = ({ title }: Props) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral900}`,
        fontSize: { mobile: '12px', desktop: '16px' },
        fontWeight: 600,
        lineHeight: '24px',
        marginBottom: '24px',
      }}
    >
      {title}
    </Typography>
  );
};

export const MainTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        textTransform: 'uppercase',
        marginBottom: '24px',
      }}
    >
      <u>{title}</u>
    </Typography>
  );
};

export const LargeTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        fontSize: { mobile: '14px', desktop: '20px' },
        fontWeight: 700,
        lineHeight: { mobile: '20px', desktop: '32px' },
        textWrap: 'wrap',
      }}
    >
      {title}
    </Typography>
  );
};

export const ViewRole = () => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [height, setHeight] = React.useState<Height>(350);
  const { setDirection } = useSetDirection();

  const handleChange = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    const handleClick = () => {
      setIsOpen(!isOpen);
      if (isOpen) {
        return setHeight(350);
      }
      setHeight('auto');
    };

    const element: any = expandRef.current;
    element?.addEventListener('click', handleClick);

    return () => {
      element?.removeEventListener('click', handleClick);
    };
  }, [isOpen, height]);

  const ActionMenuProps: React.FC = () => {
    return (
      <Link href="/">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };

  const Divider: React.FC = () => {
    return (
      <Box
        sx={{
          width: '96%',
          margin: '0 auto',
          borderBottom: '1px solid var(--colour-neutral-neutral-300, #E1E6ED)',
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        margin: '20px 0',
      }}
    >
      <TopActionsArea customStyle={{ width: '100%' }} />
      <AdminContainer>
        <Accordion
          sx={{ width: { mobile: '100%', desktop: '100%' } }}
          expanded={expanded}
          onChange={() => {
            return handleChange();
          }}
        >
          <AccordionDetails>
            <AnimateHeight id="example-panel" duration={350} height={height}>
              <Stack
                direction={setDirection()}
                sx={{
                  padding: { mobile: '15px 20px', desktop: '30px 40px' },
                  background: `${colors.primaryBlue100}`,
                }}
                spacing={2}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2}>
                  <Box mt={1.2}>
                    <LargeTitle title="Teller" />
                    <Typography
                      sx={{
                        fontSize: { mobile: '10px', desktop: '14px' },
                        fontWeight: 400,
                        lineHeight: '20px',
                      }}
                    >
                      ID:495498348{' '}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px',
                  },
                }}
              >
                <MainTitle title="Loan Details" />
              </Box>

              <Stack direction={setDirection()}>
                <Box
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <SubTitle title="Role name" />
                  <Details title="Teller" />

                  <SubTitle title="Role Level" />
                  <Details title="---" />
                </Box>
                <Box
                  sx={{
                    width: { mobile: '20%', desktop: '60%' },
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                    display: { desktop: 'grid' },
                    justifyContent: { desktop: 'center' },
                  }}
                >
                  <SubTitle title="Idle time out" />
                  <Details title="--" />

                  <SubTitle title="Role Description" />
                  <Details title="This is a brief description about this role" />
                </Box>
                <Box
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <SubTitle title="Access Days" />
                  <Details title="---" />
                </Box>
              </Stack>
              <Divider />
              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px',
                  },
                }}
              >
                <MainTitle title="Data capture privileges" />
              </Box>
              <Grid container>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
              </Grid>

              <Divider />

              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px',
                  },
                }}
              >
                <MainTitle title="Authorisation privileges" />
              </Box>
              <Grid container>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
                <Grid
                  tablet={2}
                  mobile={12}
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  }}
                >
                  <CheckboxInput label="Account Creation" />
                  <CheckboxInput label="Account OD Report" />
                  <CheckboxInput label="Amortise Payments" />
                  <CheckboxInput label="Cash Journals" />
                  <CheckboxInput label="Cheque Withdrawal" />
                </Grid>
              </Grid>
            </AnimateHeight>

            <AccordionSummary ref={expandRef}>
              <Stack
                ref={expandRef}
                direction="row"
                justifyContent="space-between"
              >
                <Typography mr={1} sx={{ textAlign: 'center' }}>
                  Click to view more details {isOpen}
                </Typography>
                <Box mt={0.6}>
                  <ChevronDown />
                </Box>
              </Stack>
            </AccordionSummary>
          </AccordionDetails>
        </Accordion>

        <Box mt={8} sx={{ width: '100%' }}>
          <FilterSection />
          <MuiTableContainer
            columns={MOCK_COLUMNS}
            data={MOCK_DATA}
            tableConfig={{
              hasActions: true,
            }}
            showHeader={{
              mainTitle: 'Users',
              secondaryTitle: 'See a directory of all customers for this role',
              hideFilterSection: true,
            }}
            ActionMenuProps={ActionMenuProps}
          />
        </Box>
      </AdminContainer>
    </Box>
  );
};
