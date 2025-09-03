import React from 'react';
import { styled as muistyled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import styled from 'styled-components';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { OtherDetailsForm } from '../Form/CreateProduct/OtherDetails';
import { PersonalCasaDetailsForm } from '../Form/CreateCasaProduct/PersonalDetailsCasaForm';
import '@/features/Setup/ProductAndGL/Form/removeDivider.module.css';
import { InterestCasaChargesForm } from '../Form/CreateCasaProduct/InterestCharge';
import { GeneralCasaLedgerForm } from '../Form/CreateCasaProduct/GeneralLedger';
import { DocumentForm } from '../Form/CreateProduct/document';
import { OtherCasaDetailsForm } from '../Form/CreateCasaProduct/OtherCasaDetails';
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
  IOccupation,
  IProdCodeType,
  IProdType,
  IProductClass,
  IProducts,
  ISector
} from '@/api/ResponseTypes/setup';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetProductType } from '@/api/general/useProductType';
import {
  useGetAllException,
  useGetAllGLWithBranchCode,
  useGetAllLoanTerm,
  useGetInterestsRate,
  useGetLoanProductCode,
  useGetMaxCreditInterest,
  useGetProductClass,
  useGetProductClassByCastegory,
  useGetProductTypeByid
} from '@/api/setup/useProduct';
import { useGetGLAccount } from '@/api/admin/useCreateGLAccount';
import { useGetAllCustomerAccountProducts } from '@/api/customer-service/useCustomer';
import { useGetChargeConcession } from '@/api/operation/useChargeConcession';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';
import { FormSkeleton } from '@/components/Loaders';
import { useGetParams } from '@/utils/hooks/useGetParams';

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
  professions?: IOccupation[];
  productTypes?: IProductType[];
  currencies?: ICurrency[];
  creditInterests?: ICreditInterests[];
  interests?: IInterests[];
  products?: IProducts[] | IProductClass[] | Array<any>;
  frequency?: IFrequency[];
  bankproducts?: IBankProducts[];
  exception?: IException[];
  // eslint-disable-next-line react/no-unused-prop-types
  bankgl?: IGLAccount[] | Array<any>;
  charges?: IChargeConcessionType[] | Array<any>;
  // eslint-disable-next-line react/no-unused-prop-types
  setProductCode?: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line react/no-unused-prop-types
  // eslint-disable-next-line react/no-unused-prop-types
  data?: IProdType[] | IProdCodeType[] | Array<any>;
  dataType?: IProdCodeType[] | IProdType[] | Array<any>;
  // eslint-disable-next-line react/no-unused-prop-types
  dataWithCode?:
    | IProdType[]
    | IProdCodeType[]
    | IGLWithBranchCode[]
    | Array<any>;
  // eslint-disable-next-line react/no-unused-prop-types
  setSelectedCurrency?: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line react/no-unused-prop-types
  selectedCurrency?: string;
};

const FormSelector = ({
  cardKey,
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
  productTypes,
  currencies,
  creditInterests,
  interests,
  products,
  frequency,
  bankgl,
  bankproducts,
  exception,
  charges,
  setProductCode,
  data,
  dataType,
  dataWithCode,
  setSelectedCurrency,
  selectedCurrency
}: Props) => {
  let selectedForm;
  switch (cardKey) {
    case 'personalDetails':
      selectedForm = (
        <PersonalCasaDetailsForm
          titles={titles}
          sectors={sectors}
          education={Array.isArray(education) ? education : []}
          countries={countries}
          states={states}
          towns={towns}
          selectedCurrency={selectedCurrency as string}
          setSelectedCurrency={
            setSelectedCurrency as unknown as React.Dispatch<
              React.SetStateAction<string>
            >
          }
          setProductCode={
            setProductCode as unknown as React.Dispatch<
              React.SetStateAction<string>
            >
          }
          professions={professions}
          productTypes={productTypes as IProductType[] | undefined}
          currencies={currencies}
          products={products as IProducts[] | undefined}
          frequency={frequency}
          data={data as IProdType[] | undefined}
          dataType={dataType as IProdCodeType[] | undefined}
        />
      );
      break;
    case 'interestCharges':
      selectedForm = (
        <InterestCasaChargesForm
          countries={countries}
          states={states}
          towns={towns}
          currencies={currencies}
          creditInterests={creditInterests}
          interests={interests}
          productTypes={productTypes}
          bankproducts={bankproducts}
          exception={exception}
          charges={charges}
        />
      );
      break;
    case 'generalLedge':
      selectedForm = (
        <GeneralCasaLedgerForm
          states={states}
          towns={towns}
          bankgl={bankgl}
          dataWithCode={dataWithCode as IGLWithBranchCode[]}
        />
      );
      break;
    case 'document':
      selectedForm = <DocumentForm />;
      break;
    case 'otherDetails':
      selectedForm = <OtherCasaDetailsForm />;
      break;
    default:
      break;
  }

  return selectedForm;
};

export const ShortCardCasaWithAccordion = ({
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
  charges,
  productTypes,
  currencies,
  creditInterests,
  interests,
  products,
  frequency,
  bankproducts,
  exception,
  setProductCode,
  data,
  dataType
}: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const isEditing = useGetParams('isEditing') || null;
  const handleChange = () => {
    setExpanded(!expanded);
  };
  const productClassBYID = localStorage.getItem('addProduct');
  const [productCodeType, setproductType] = React.useState('');

  const { currencies: currency } = useGetCurrency();
  const { productTypes: productType } = useGetProductType();
  const { creditInterests: creditInterest } = useGetMaxCreditInterest();
  const { interests: interest } = useGetInterestsRate();
  const { products: product } = useGetProductClass();
  const { frequency: frequencys } = useGetAllLoanTerm();
  const { bankgl: bankgls } = useGetGLAccount();
  const { bankproducts: bankproduct } = useGetAllCustomerAccountProducts();
  const { exception: exceptions } = useGetAllException();
  const { charges: charge, isLoading } = useGetChargeConcession();
  const { data: glwithCode } = useGetAllGLWithBranchCode();
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const { products: productClassBY } = useGetLoanProductCode(productClassBYID);
  if (setProductCode) {
    setProductCode(productCodeType);
  }
  const { data: producttypeId } = useGetProductTypeByid(
    productCodeType as unknown as string
  );
  const { data: productCategory } =
    useGetProductClassByCastegory(productClassBYID);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

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
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                relationships={relationships}
                idCards={idCards}
                officers={officers}
                groups={groups}
                branches={branches}
                sectors={sectors}
                education={education}
                professions={professions}
                productTypes={productType as IProductType[] | undefined}
                currencies={currency}
                setProductCode={setproductType}
                creditInterests={creditInterest}
                interests={interest}
                products={productClassBY}
                frequency={frequencys}
                data={productCategory as IProdType[]}
                dataType={producttypeId as IProdCodeType[]}
                bankgl={bankgls as IGLAccount[] | undefined}
                bankproducts={bankproduct}
                exception={exceptions}
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
