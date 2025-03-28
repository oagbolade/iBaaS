import * as React from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Avatar from '@mui/material/Avatar';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Stack } from '@mui/material';
import AnimateHeight, { Height } from 'react-animate-height';
import { avatarStyle } from './styles';
import { ViewAccount } from './ViewAccount';
import { ChevronDown, ExternalLinkIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { Status } from '@/components/Labels';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';

import {
  ICustomerDetails,
  IProductDetails
} from '@/schemas/schema-values/loan';

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
    boxShadow: 'none'
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
      justifyContent: 'center'
    }
  };
});

const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: 0
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
        textTransform: 'uppercase'
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
        textWrap: 'wrap'
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
        marginBottom: '24px'
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
        textWrap: 'wrap'
      }}
    >
      {title}
    </Typography>
  );
};

type Props = {
  loanAccDetails?: ILoanAccountDetails;
  customerDetails?: ICustomerDetails;
  loanAccountNumber?: string;
  loanProducts: IProductDetails;
};

export const LoanDetails = ({
  loanAccDetails,
  customerDetails,
  loanAccountNumber,
  loanProducts
}: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<Height>(350);
  const [open, setOpen] = React.useState(false);
  const { setDirection } = useSetDirection();

  const toggleModal = () => {
    setOpen(!open);
  };

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
        margin: '20px 0'
      }}
    >
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
                background: `${colors.primaryBlue100}`
              }}
              spacing={2}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    ...avatarStyle
                  }}
                >
                  AA
                </Avatar>
                <Box mt={1.2}>
                  <LargeTitle title={customerDetails?.accounttitle || 'N/A'} />
                  <Typography
                    sx={{
                      fontSize: { mobile: '10px', desktop: '14px' },
                      fontWeight: 400,
                      lineHeight: '20px'
                    }}
                  >
                    {customerDetails?.customerid || 'N/A'}
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
                    lineHeight: '24px'
                  }}
                >
                  Status
                </Typography>
                <Status
                  label={
                    Number(customerDetails?.acctstatus) === 1
                      ? 'Active'
                      : 'Inactive'
                  }
                  status={
                    Number(customerDetails?.acctstatus) === 1
                      ? 'success'
                      : 'warning'
                  }
                />
              </Box>
            </Stack>
            <Stack direction={setDirection()}>
              <Box
                sx={{
                  width: '372px',
                  padding: { mobile: '10px 17px', desktop: '20px 32px' },
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)'
                }}
              >
                <MainTitle title="Account Details" />
                <SubTitle title="Account Name" />
                <Details title={customerDetails?.accounttitle || 'N/A'} />
                <SubTitle title="Account Number" />
                <Details title={customerDetails?.accountnumber || 'N/A'} />

                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    width: '260px',
                    padding: '12px 16px',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    background: `${colors.neutral200}`
                  }}
                >
                  <Stack direction="column">
                    <Typography
                      sx={{
                        color: `${colors.neutral900}`,
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px'
                      }}
                    >
                      Loan Account {loanAccountNumber || 'N/A'}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      textAlign: 'right',
                      float: 'right',
                      width: '100%'
                    }}
                  >
                    <IconButton onClick={toggleModal}>
                      <ExternalLinkIcon />
                    </IconButton>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    width: '260px',
                    padding: '12px 16px',
                    marginTop: '10px',
                    marginBottom: '10px',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    background: `${colors.neutral200}`
                  }}
                >
                  <Stack direction="column">
                    <Typography
                      sx={{
                        color: `${colors.neutral900}`,
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px'
                      }}
                    >
                      CASA Account {customerDetails?.accountnumber}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      textAlign: 'right',
                      float: 'right',
                      width: '100%'
                    }}
                  >
                    <IconButton onClick={toggleModal}>
                      <ExternalLinkIcon />
                    </IconButton>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    width: '260px',
                    padding: '12px 16px',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    background: `${colors.neutral200}`
                  }}
                >
                  <Stack direction="column">
                    <Typography
                      sx={{
                        color: `${colors.neutral900}`,
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px'
                      }}
                    >
                      TD Account{' '}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      textAlign: 'right',
                      float: 'right',
                      width: '100%'
                    }}
                  >
                    <IconButton onClick={toggleModal}>
                      <ExternalLinkIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: { mobile: '100%', desktop: '372px' },
                  padding: '20px 32px',
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)'
                }}
              >
                <MainTitle title="Product Details" />

                <SubTitle title="Product Name" />
                <Details title={loanProducts?.productName || 'N/A'} />

                <SubTitle title="Product Currency" />
                <Details title="NGN" />

                <SubTitle title="Product Start date" />
                <Details
                  title={
                    loanProducts?.productstart
                      ? moment(loanProducts.productstart).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )
                      : 'N/A'
                  }
                />

                <Details title="Product expiry date" />
                <Details
                  title={
                    loanProducts?.productExpire
                      ? moment(loanProducts.productExpire).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )
                      : 'N/A'
                  }
                />

                <SubTitle title="Minimum Loan Amount" />
                <Details title={loanProducts?.productName || 'N/A'} />

                <SubTitle title="Maximum loan amount" />
                <Details title={String(loanProducts?.maxloan) || 'N/A'} />

                <SubTitle title="Maximum interest Rate (%)" />
                <Details title={loanProducts?.maxintrate || 'N/A'} />

                <SubTitle title="Calculation Method" />
                <Details
                  title={String(loanProducts?.penalrateCalcMethod) || 'N/A'}
                />

                <SubTitle title="Default Repayment Type" />
                <Details title={loanProducts?.repayoption || 'N/A'} />

                <SubTitle title="Collateral Value" />
                <Details title={loanProducts?.collval || 'N/A'} />
              </Box>

              <Box
                sx={{
                  width: '372px',
                  padding: '20px 32px',
                  borderRight:
                    '1px solid var(--colour-neutral-neutral-300, #E1E6ED)'
                }}
              >
                <MainTitle title="Account Info" />
                <SubTitle title="Account Name" />
                <Details title={customerDetails?.accounttitle || 'N/A'} />
                <SubTitle title="Account Number" />
                <Details title={customerDetails?.accountnumber || 'N/A'} />

                <SubTitle title="Branch" />
                <Details title={customerDetails?.branch || 'N/A'} />

                <SubTitle title="Book Balance" />
                <Details title={customerDetails?.bkbal || 'N/A'} />

                <SubTitle title="Effective balance" />
                <Details title={customerDetails?.effbal || 'N/A'} />

                <SubTitle title="Usable Balance" />
                <Details title={customerDetails?.usebal || 'N/A'} />

                <SubTitle title="Source Type" />
                <Details title="---" />

                <SubTitle title="Source" />
                <Details title={customerDetails?.source || 'N/A'} />
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
                Click to view more details
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
          width: { mobile: '100%', desktop: '1037px' },
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 40px',
          alignItems: 'flex-start',
          gap: '32px',
          borderRadius: '5px',
          background: `${colors.white}`,
          border: `1px solid ${colors.neutral300}`
        }}
      >
        <Box
          sx={{
            width: { mobile: '100%', desktop: '967px' },
            borderBottom: `1px solid ${colors.neutral300}`
          }}
        >
          <LargeTitle title="Loan Account Details" />
        </Box>
        <Stack direction={setDirection()}>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Settlement Account number" />
            <Details title={loanAccDetails?.settlementAcct || 'N/A'} />

            <SubTitle title="Product Name" />
            <Details title={loanAccDetails?.productName || 'N/A'} />

            <SubTitle title="Loan Term (Months)" />
            <Details title={loanAccDetails?.loanTerm || 'N/A'} />

            <SubTitle title="Repayment Type" />
            <Details title={loanAccDetails?.repaymentType || 'N/A'} />

            <SubTitle title="Calculation Method" />
            <Details title={loanAccDetails?.calculationName || 'N/A'} />

            <SubTitle title="Start Date" />
            <Details
              title={
                loanAccDetails?.startdate
                  ? moment(loanAccDetails.startdate).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )
                  : 'N/A'
              }
            />

            <SubTitle title="Principal Due" />
            <Details title="N/A" />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Branch" />
            <Details title={loanAccDetails?.branchName || 'N/A'} />

            <SubTitle title="Currency" />
            <Details title="NGN" />

            <SubTitle title="Loan Rate (%)" />
            <Details title={loanAccDetails?.intRate || 'N/A'} />

            <SubTitle title="Term Remaining" />
            <Details title={loanAccDetails?.totaldays || 'N/A'} />

            <SubTitle title="Loan Schedule Description" />
            <Details title="N/A" />

            <SubTitle title="Maturity Date" />
            <Details
              title={
                loanAccDetails?.matdate
                  ? moment(loanAccDetails.matdate).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )
                  : 'N/A'
              }
            />

            <SubTitle title="Interest Due" />
            <Details title="N/A" />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Product Code" />
            <Details title={loanAccDetails?.productCode || 'N/A'} />

            <SubTitle title="Loan Amount" />
            <Details
              title={`NGN ${formatCurrency(loanAccDetails?.loanAmount || 0) || 'N/A'}`}
            />

            {/*  TODO: remove empty titles once API returns the responses */}
            <SubTitle title="Loan Purpose" />
            <Details title="N/A" />

            <SubTitle title="Repayment Mode" />
            <Details title={loanAccDetails?.repaymentType || 'N/A'} />

            <SubTitle title="First Repayment Date" />
            <Details title="N/A" />

            <SubTitle title="Total No. of Installment" />
            <Details title="N/A" />

            <SubTitle title="Account Status" />
            <Status label="Active" status="success" />
          </Box>
        </Stack>
      </Box>

      <ViewAccount open={open} toggleModal={toggleModal} />
    </Box>
  );
};
