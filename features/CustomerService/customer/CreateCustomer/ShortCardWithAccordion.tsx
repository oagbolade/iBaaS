import React from 'react';
import { styled as muistyled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import styled from 'styled-components';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import {
  BusinessDetailsForm,
  PersonalDetailsFormWrapper,
  NextOfKinDetailsForm,
  ReferrerDetailsForm,
  IdentificationDetailsForm
} from '@/features/CustomerService/Form/CreateCustomerForms';
import './removeDivider.module.css';
import {
  ChevronDown,
  CompletedStepIcon,
  UnCompletedStepIcon
} from '@/assets/svg';
import colors from '@/assets/colors';
import {
  ICountries,
  IGroup,
  IIDTypes,
  IRelationship,
  IStates,
  ITitle,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { IBranches } from '@/api/ResponseTypes/general';
import {
  IEducation,
  IEducationByCode,
  IOccupation,
  ISector
} from '@/api/ResponseTypes/setup';

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
  hideCompleted?: boolean;
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
  professions
}: Props) => {
  let selectedForm;
  switch (cardKey) {
    case 'personalDetails':
      selectedForm = (
        <PersonalDetailsFormWrapper
          titles={titles}
          sectors={sectors}
          education={Array.isArray(education) ? education : []}
          countries={countries}
          states={states}
          towns={towns}
          professions={professions}
        />
      );
      break;
    case 'businessDetails':
      selectedForm = (
        <BusinessDetailsForm
          countries={countries}
          states={states}
          towns={towns}
        />
      );
      break;
    case 'nextOfKinDetails':
      selectedForm = (
        <NextOfKinDetailsForm
          relationships={relationships}
          states={states}
          towns={towns}
        />
      );
      break;
    case 'identificationDetails':
      selectedForm = <IdentificationDetailsForm idCards={idCards} />;
      break;
    case 'referrerDetails':
      selectedForm = (
        <ReferrerDetailsForm
          officers={officers}
          groups={groups}
          branches={branches}
        />
      );
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
  hideCompleted = false,
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
  professions
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

              <Stack direction="row" justifyContent="space-between">
                {!hideCompleted && completed?.[cardKey] && (
                  <>
                    <Typography
                      sx={{
                        marginBottom: expanded ? '35px' : '15px',
                        color: `${colors.neutral900}`,
                        fontSize: '16px',
                        fontWeight: 300,
                        lineHeight: '24px',
                        width: '146px'
                      }}
                      mt={0.8}
                      mr={1}
                    >
                      {completed[cardKey].progress} of{' '}
                      {completed[cardKey].total} completed
                    </Typography>
                    <Box mr={2} mt={0.8}>
                      {completed[cardKey].progress ===
                      completed[cardKey].total ? (
                        <CompletedStepIcon />
                      ) : (
                        <UnCompletedStepIcon />
                      )}
                    </Box>
                  </>
                )}

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
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </AccordionWrapper>
    </Box>
  );
};
