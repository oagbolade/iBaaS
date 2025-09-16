import React from 'react';
import { styled as muistyled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import styled from 'styled-components';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { PersonalDetailsForm } from './CreateProduct/PersonalDetailFormWrapper';
import { InterestLoanChargesForm } from './CreateProduct/interestCharges';
import { GeneralLedgerForm } from './CreateProduct/GeneralLedger';
import './removeDivider.module.css';
import { OtherDetailsForm } from './CreateProduct/OtherDetails';
import { DocumentForm } from './CreateProduct/document';
import {
  ChevronDown,
  CompletedStepIcon,
  UnCompletedStepIcon
} from '@/assets/svg';
import colors from '@/assets/colors';
import {
  IBankProducts,
  ICountries,
  IGroup,
  IIDTypes,
  IRelationship,
  IStates,
  ITitle,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { IAccountOfficers, IGLAccount } from '@/api/ResponseTypes/admin';
import {
  IBranches,
  ICurrency,
  IProductType
} from '@/api/ResponseTypes/general';
import {
  ICreditInterests,
  IEducation,
  IEducationByCode,
  IException,
  IFrequency,
  IGLWithBranchCode,
  IInterests,
  ILoanClass,
  IOccupation,
  IProdCodeType,
  IProdType,
  IProductClass,
  IProducts,
  ISector
} from '@/api/ResponseTypes/setup';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetProductType } from '@/api/general/useProductType';
import { IProductLoanRepayment } from '@/api/ResponseTypes/loans';
import { useGetAllLoanRepaymentTypes } from '@/api/loans/useCreditFacility';
import {
  useGetAllException,
  useGetAllGLWithBranchCode,
  useGetAllLoanTerm,
  useGetLoanClass,
  useGetMaxCreditInterest,
  useGetProductClass,
  useGetProductClassByCastegory,
  useGetProductTypeByid
} from '@/api/setup/useProduct';
import { useGetAllCustomerAccountProducts } from '@/api/customer-service/useCustomer';
import { useGetGLAccount } from '@/api/admin/useCreateGLAccount';
import { useGetChargeConcession } from '@/api/operation/useChargeConcession';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';

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

export type ProgressType = {
  total: number;
  progress: number;
};

type Props = {
  cardTitle?: string;
  cardKey: string;
  completed?: Record<string, ProgressType>;
  titles?: ITitle[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  relationships?: IRelationship[];
  officers?: IAccountOfficers[];
  idCards?: IIDTypes[];
  groups?: IGroup[];
  branches?: IBranches[];
  sectors?: ISector[];
  education?: IEducationByCode | IEducation[] | Array<any>;
  professions?: IOccupation[] | undefined;
  productTypes?: IProductType[] | undefined;
  currencies?: ICurrency[];
  repaymentTypes?: IProductLoanRepayment[] | Array<any>;
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  interests?: IInterests[];
  products?: IProducts[] | IProductClass[] | Array<any>;
  bankproducts?: IBankProducts[];
  exception?: IException[];
  frequency?: IFrequency[];
  bankgl?: IGLAccount[] | Array<any>;
  charges?: IChargeConcessionType[] | Array<any>;
  data?: IProdType[] | IProdCodeType[] | Array<any>;
  dataType?: IProdCodeType[] | IProdType[] | Array<any>;
  productCodeGenarate?: string | undefined;
  setProductCodeGenarate?: React.Dispatch<React.SetStateAction<string>>;
  setProductCode?: React.Dispatch<React.SetStateAction<string>>;
  dataWithCode?:
    | IProdType[]
    | IProdCodeType[]
    | IGLWithBranchCode[]
    | Array<any>;
};

type PropsAccordion = {
  cardTitle?: string;
  cardKey: string;
  completed?: Record<string, ProgressType>;
  titles?: ITitle[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  relationships?: IRelationship[];
  officers?: IAccountOfficers[];
  idCards?: IIDTypes[];
  groups?: IGroup[];
  branches?: IBranches[];
  sectors?: ISector[];
  education?: IEducationByCode | IEducation[] | Array<any>;
  professions?: IOccupation[] | undefined;
  productCodeGenarate?: string | undefined;
  setProductCodeGenarate?: React.Dispatch<React.SetStateAction<string>>;
  setProductCode?: React.Dispatch<React.SetStateAction<string>>;
};

const FormSelector = ({
  cardKey,
  countries,
  states,
  towns,
  currencies,
  repaymentTypes,
  creditInterests,
  loanClass,
  bankproducts,
  exception,
  frequency,
  bankgl,
  charges,
  data,
  productCodeGenarate,
  setProductCodeGenarate,
  dataType,
  setProductCode,
  dataWithCode
}: Props) => {
  let selectedForm;
  switch (cardKey) {
    case 'personalDetails':
      selectedForm = (
        <PersonalDetailsForm
          productCodeGenarate={productCodeGenarate as string}
          setProductCode={
            setProductCode as unknown as React.Dispatch<
              React.SetStateAction<string>
            >
          }
          setProductCodeGenarate={
            setProductCodeGenarate as unknown as React.Dispatch<
              React.SetStateAction<string>
            >
          }
          dataType={dataType as IProdCodeType[]}
          currencies={currencies}
          data={data as IProdType[] | undefined}
          frequency={frequency}
        />
      );
      break;
    case 'interestCharges':
      selectedForm = (
        <InterestLoanChargesForm  
          repaymentTypes={repaymentTypes}
          creditInterests={creditInterests}
          loanClass={loanClass}
          bankproducts={bankproducts}
          exception={exception}
          charges={charges}
        />
      );
      break;
    case 'generalLedge':
      selectedForm = (
        <GeneralLedgerForm
          bankgl={bankgl}
          dataWithCode={dataWithCode as IGLWithBranchCode[]}
        />
      );
      break;
    case 'document':
      selectedForm = <DocumentForm />;
      break;
    case 'otherDetails':
      selectedForm = <OtherDetailsForm />;
      break;
    default:
      break;
  }

  return selectedForm;
};

export const ShortCardWithAccordion = ({
  cardTitle,
  cardKey,
  completed,
  titles,
  countries,
  states,
  towns,
  relationships,
  idCards,
  officers,
  groups,
  branches,
  sectors,
  education,
  professions,
  productCodeGenarate,
  setProductCodeGenarate,
  setProductCode
}: PropsAccordion) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  const productClassBYID = localStorage.getItem('addProduct');
  const [productType, setproductType] = React.useState('');
  const { currencies: Currency } = useGetCurrency();
  const { productTypes: product } = useGetProductType();
  const { repaymentTypes: repaymentType } = useGetAllLoanRepaymentTypes();
  const { loanClass: loan } = useGetLoanClass();
  const { creditInterests: creditInterest } = useGetMaxCreditInterest();
  const { products: productclass } = useGetProductClass();
  const { bankproducts: bankproduct } = useGetAllCustomerAccountProducts();
  const { exception: exceptions } = useGetAllException();
  const { frequency: frequencys } = useGetAllLoanTerm();
  const { bankgl: bankgls } = useGetGLAccount();
  const { charges: charge } = useGetChargeConcession();
  const { data: glwithCode } = useGetAllGLWithBranchCode();
  if (setProductCode) {
    setProductCode(productType);
  }
  const { data: producttypeId } = useGetProductTypeByid(
    productType as unknown as string
  );
  const { data: productCategory } =
    useGetProductClassByCastegory(productClassBYID);
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
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    marginBottom: expanded ? '35px' : '15px',
                    color: colors.neutral900,
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: '24px',
                    width: '146px'
                  }}
                  mt={0.8}
                  mr={1}
                >
                  {completed && completed[cardKey]
                    ? `${completed[cardKey].progress} of ${completed[cardKey].total} completed`
                    : '0 of 0 completed'}
                </Typography>
                <Box mr={2} mt={0.8}>
                  {completed &&
                  completed[cardKey]?.progress === completed[cardKey].total ? (
                    <CompletedStepIcon />
                  ) : (
                    <UnCompletedStepIcon />
                  )}
                </Box>
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
            </Stack>
          </AccordionSummary>
          <Divider light />
          <AccordionDetails>
            <Grid container spacing={2}>
              <FormSelector
                cardKey={cardKey}
                titles={titles}
                countries={countries}
                states={states}
                towns={towns}
                relationships={relationships}
                idCards={idCards}
                officers={officers}
                groups={groups}
                branches={branches}
                sectors={sectors}
                education={education}
                professions={professions}
                setProductCodeGenarate={setProductCodeGenarate}
                productCodeGenarate={productCodeGenarate}
                setProductCode={setproductType}
                currencies={Currency}
                repaymentTypes={repaymentType}
                creditInterests={creditInterest}
                loanClass={loan}
                bankproducts={bankproduct}
                exception={exceptions}
                data={productCategory as IProdType[]}
                frequency={frequencys}
                bankgl={bankgls as IGLAccount[] | undefined}
                dataType={producttypeId as IProdCodeType[]}
                charges={charge}
                dataWithCode={glwithCode as IGLWithBranchCode[]}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </AccordionWrapper>
    </Box>
  );
};
