import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Avatar from '@mui/material/Avatar';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import AnimateHeight, { Height } from 'react-animate-height';
// eslint-disable-next-line import/no-cycle
import { TopBorderSection } from './TopBorderSection';
import { avatarStyle } from './styles';
import { ChevronDown, ExternalLinkIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { Status } from '@/components/Labels';

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
    width: '1037px',
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  return {
    padding: 0,
  };
});

export const SubTitle = ({ title }: { title: string }) => {
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

export const Details = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral900}`,
        fontSize: '16px',
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
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '32px',
      }}
    >
      {title}
    </Typography>
  );
};

type Props = {
  showTopBorder?: boolean;
};

export const LoanDetails = ({ showTopBorder }: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [height, setHeight] = React.useState<Height>(350);

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

  return (
    <Box
      sx={{
        marginTop: '20px',
      }}
    >
      {showTopBorder && <TopBorderSection />}
      <Accordion
        expanded={expanded}
        onChange={() => {
          return handleChange();
        }}
      >
        <AccordionDetails>
          <AnimateHeight id="example-panel" duration={350} height={height}>
            <Stack
              direction="row"
              sx={{
                padding: '30px 40px',
                background: `${colors.primaryBlue100}`,
              }}
              spacing={2}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    ...avatarStyle,
                  }}
                >
                  AA
                </Avatar>
                <Box mt={1.2}>
                  <LargeTitle title="Mariam Omodayo Oluwafunke" />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                    }}
                  >
                    ID:495498348{' '}
                  </Typography>
                </Box>
              </Stack>
              <Box>
                <Typography
                  sx={{
                    color: `${colors.neutral700}`,
                    fontStyle: 'italic',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  Status
                </Typography>
                <Status label="Active" status="success" />
              </Box>
            </Stack>
            <Stack direction="row">
              <Box
                sx={{
                  width: '372px',
                  padding: '20px 32px',
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)',
                }}
              >
                <MainTitle title="Account Details" />
                <SubTitle title="Account Name" />
                <Details title="Mariam Omodayo Oluwafunke" />
                <SubTitle title="Account Number" />
                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    width: '260px',
                    padding: '12px 16px',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    background: `${colors.neutral200}`,
                  }}
                >
                  <Stack direction="column">
                    <Typography
                      sx={{
                        color: `${colors.neutral900}`,
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                      }}
                    >
                      Loan Account{' '}
                    </Typography>
                    <Typography
                      sx={{
                        color: `${colors.neutral700}`,
                        fontSize: '12px',
                        fontWeight: 700,
                        lineHeight: '16px',
                      }}
                    >
                      N43,954,321.34{' '}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      textAlign: 'right',
                      float: 'right',
                      width: '100%',
                    }}
                  >
                    <ExternalLinkIcon />
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: '372px',
                  padding: '20px 32px',
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)',
                }}
              >
                <MainTitle title="Product Details" />
                <SubTitle title="Product Name" />
                <Details title="Managed Services Savings" />
                <SubTitle title="Product Currency" />
                <Details title="NGN" />

                <SubTitle title="Product Start date" />
                <Details title="02 January, 2023. 11:54pm" />

                <Details title="Product expiry date" />
                <SubTitle title="02 January, 2023. 11:54pm" />

                <SubTitle title="Minimum Loan Amount" />
                <Details title="N35,000" />

                <SubTitle title="Maximum loan amount" />
                <Details title="N1,472,050,900" />

                <SubTitle title="Maximum interest Rate (%)" />
                <Details title="3.2" />

                <SubTitle title="Calculation Method" />
                <Details title="Flat" />

                <SubTitle title="Default Repayment Type" />
                <Details title="---" />

                <SubTitle title="Collateral Value" />
                <Details title="Collateral Value" />
              </Box>
              <Box
                sx={{
                  width: '372px',
                  padding: '20px 32px',
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)',
                }}
              >
                <MainTitle title="Account Info" />
                <SubTitle title="Account Name" />
                <Details title="Mariam Omodayo Oluwafunke" />
                <SubTitle title="Account Number" />
                <Details title="409859439393" />

                <SubTitle title="Branch" />
                <Details title="Sabo Branch" />

                <SubTitle title="Book Balance" />
                <Details title="N12,565,321.54" />

                <SubTitle title="Effective balance" />
                <Details title="N11,000,870.54" />

                <SubTitle title="Usable Balance" />
                <Details title="N11,000,870.54" />

                <SubTitle title="Source Type" />
                <Details title="---" />
                <SubTitle title="Source" />
                <Details title="---" />
              </Box>
            </Stack>
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
      <Box
        mt={4}
        sx={{
          width: '1037px',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 40px',
          alignItems: 'flex-start',
          gap: '32px',
          borderRadius: '5px',
          background: `${colors.white}`,
          border: `1px solid ${colors.neutral300}`,
        }}
      >
        <Box
          sx={{
            width: '967px',
            borderBottom: `1px solid ${colors.neutral300}`,
          }}
        >
          <LargeTitle title="Loan Account Details" />
        </Box>
        <Stack direction="row">
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Settlement Account number" />
            <Details title="39483593939" />

            <SubTitle title="Product Name" />
            <Details title="Educational Loan" />

            <SubTitle title="Loan Term (Months)" />
            <Details title="34" />

            <SubTitle title="Repayment Type" />
            <Details title="1" />

            <SubTitle title="Calculation Method" />
            <Details title="3" />

            <SubTitle title="Start Date" />
            <Details title="02 March, 2023  11:03pm" />

            <SubTitle title="Principal Due" />
            <Details title="N1,324,907.32" />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Branch" />
            <Details title="Marina Branch" />

            <SubTitle title="Currency" />
            <Details title="NGN" />

            <SubTitle title="Loan Rate (%)" />
            <Details title="3.2" />

            <SubTitle title="Term Remaining" />
            <Details title="3" />

            <SubTitle title="Loan Schedule Description" />
            <Details title="Flat Rate" />

            <SubTitle title="Maturity Date" />
            <Details title="02 January, 2025  11:03pm" />

            <SubTitle title="Interest Due" />
            <Details title="N440,320.54" />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Product Code" />
            <Details title="301" />

            <SubTitle title="Loan Amount" />
            <Details title="N1,800,320.54" />

            <SubTitle title="Loan Purpose" />
            <Details title="To buy equipments" />

            <SubTitle title="Repayment Mode" />
            <Details title="Equal principal & intrest" />

            <SubTitle title="First Repayment Date" />
            <Details title="02 January, 2023  11:03pm" />

            <SubTitle title="Total No. of Installment" />
            <Details title="4" />

            <SubTitle title="Account Status" />
            <Status label="Active" status="success" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
