'use client';
import * as React from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { ShortCardWithAccordion } from './ShortCardWithAccordion';
import { CorporateCustomerPersonalDetailsForm } from '@/features/CustomerService/Form/CreateCustomerForms/CorporateCustomerPersonalDetailsForm';
import { useCreateValidationKeysMapper } from '@/utils/hooks/useCreateValidationKeysMapper';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  corporateCustomerPersonalDetails,
  createCustomer,
  handleInconsistencyForPersonalDetailsCreateMode,
  handleInconsistencyForPersonalDetailsEditMode,
  individualCustomerPersonalDetails
} from '@/schemas/customer-service';
import {
  CreateCorporateCustomerFormValues,
  createCorporateCustomerInitialValues,
  createCustomerInitialValues,
  CreateIndividualCustomerFormValues
} from '@/schemas/schema-values/customer-service';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import {
  useCreateCorporateCustomer,
  useCreateIndividualCustomer,
  useGetAllIdTypes,
  useGetCustomerByIdCodes
} from '@/api/customer-service/useCustomer';
import {
  useGetAllCountries,
  useGetAllStates,
  useGetAllTown
} from '@/api/general/useGeography';
import { useGetAllTitles } from '@/api/general/useTitle';
import { FormSkeleton } from '@/components/Loaders';
import { useGetAllRelationships } from '@/api/setup/useRelationship';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import {
  CustomerCreationContext,
  progressCompletionInitialValues
} from '@/context/CustomerCreationContext';
import { BatchTitle } from '@/features/Operation/Forms/style';
import { PageTitle } from '@/components/Typography';
import { useGetAllGroups } from '@/api/general/useGroup';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllSectors } from '@/api/setup/useSector';
import { useGetAllEducation } from '@/api/setup/useEducation';
import { useGetAllOccupation } from '@/api/setup/useOccupation';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { ICustomerResult } from '@/api/ResponseTypes/customer-service';
import { useHandleCompletedFields } from '@/utils/hooks/useHandleCompletedFields';
import { encryptData } from '@/utils/encryptData';

const TrackVisitedFields = ({ isEditing }: { isEditing: string | null }) => {
  const { customerType, setCompleted } = React.useContext(
    CustomerCreationContext
  );
  const individual = '1';
  const shouldRemoveCorporateDetails = Boolean(
    isEditing && customerType === individual
  );
  const { validationKeysMapper } = useCreateValidationKeysMapper(
    shouldRemoveCorporateDetails
  );
  const { handleCompletedFields } = useHandleCompletedFields<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >(setCompleted, validationKeysMapper);

  const useUpdateCompletion = <
    T extends
      | CreateIndividualCustomerFormValues
      | CreateCorporateCustomerFormValues
  >(
    touched: Record<string, boolean | undefined>,
    values: T
  ) => {
    React.useEffect(() => {
      const atLeastOneFieldHasBeenVisited = Object.keys(touched).length > 0;

      if (atLeastOneFieldHasBeenVisited) {
        handleCompletedFields(values);
      }
    }, [touched, values]);
  };

  const { touched, values } = useFormikContext<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >();

  useUpdateCompletion<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >(touched, values);

  return null;
};

export const CreateCustomerContainer = () => {
  const isEditing = useGetParams('isEditing') || null;
  const customerId = useGetParams('customerId') || '';
  const getCustomerType = useGetParams('type') || 'individual';

  const {
    customerType,
    accountOfficerValue,
    introducerIdValue,
    completed,
    setCustomerType,
    setCompleted,
    setAccountOfficerValue,
    setIntroducerIdValue
  } = React.useContext(CustomerCreationContext);
  React.useEffect(() => {
    setCustomerType(getCustomerType);
  }, [getCustomerType, setCustomerType]);
  const { countries, isLoading: areContriesLoading } = useGetAllCountries();
  const { towns, isLoading: areTownsLoading } = useGetAllTown();
  const { states, isLoading: areStatesLoading } = useGetAllStates();
  const { title, isLoading: areTitlesLoading } = useGetAllTitles();
  const { relationships, isLoading: areRelationshipsLoading } =
    useGetAllRelationships();

  const individual = '1';
  const corporate = '2';

  const { groups, isLoading: areGroupsLoading } = useGetAllGroups();
  const { branches, isLoading: arebranchesLoading } = useGetBranches();
  const { idCards, isLoading: areIdsLoading } = useGetAllIdTypes();
  const { officers, isLoading: areOfficersLoading } = useGetAccountOfficers();
  const { sectors, isLoading: aresectorsLoading } = useGetAllSectors();
  const { education, isLoading: areEducationLoading } = useGetAllEducation();
  const { professions, isLoading: areOccupationsLoading } =
    useGetAllOccupation();
  const { isLoading } = useGlobalLoadingState();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { mutate } = useCreateIndividualCustomer(
    Boolean(isEditing),
    encryptData(customerId)
  );
  const { mutate: mutateCorporateCustomer } = useCreateCorporateCustomer(
    Boolean(isEditing),
    encryptData(customerId) as string
  );
  const { customerResult, isLoading: isCustomerResultLoading } =
    useGetCustomerByIdCodes(encryptData(customerId) as string);

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    setAccountOfficerValue(customerResult?.acctOfficer || '');
    setIntroducerIdValue(customerResult?.introid || '');
  }, [customerResult, setAccountOfficerValue, setIntroducerIdValue]);

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        onClick={triggerSubmission}
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  const shouldRemoveCorporateDetails = Boolean(
    isEditing && customerResult?.customerType === individual
  );
  const { validationKeysMapper } = useCreateValidationKeysMapper(
    shouldRemoveCorporateDetails,
    Boolean(isEditing)
  );

  const { handleCompletedFields } = useHandleCompletedFields<ICustomerResult>(
    setCompleted,
    validationKeysMapper
  );
  const introducerNumber = localStorage.getItem('introducerType');
  // eslint-disable-next-line no-nested-ternary
  const val =
    // eslint-disable-next-line no-nested-ternary
    introducerNumber === 'staff'
      ? 0
      : introducerNumber === 'customer'
        ? 2
        : null;
  const onSubmit = async (values: any) => {
    const emailalert = (
      document.querySelector('#test-email') as HTMLInputElement
    )?.checked;
    const smsalert = (document.querySelector('#test-sms') as HTMLInputElement)
      ?.checked;

    const dob = dayjs(values.dob).toISOString();
    const idExpryDate = dayjs(values.idExpryDate).toISOString();
    const idIssueDate = dayjs(values.idIssueDate).toISOString();

    const getAllValues = {
      ...values,
      dob,
      emailalert: Number(emailalert),
      smsalert: Number(smsalert),
      idIssueDate,
      idExpryDate,
      introid: isEditing
        ? introducerIdValue
        : extractIdFromDropdown(introducerIdValue),
      introType: isEditing ? val : val,
      acctOfficer: isEditing
        ? accountOfficerValue
        : extractIdFromDropdown(accountOfficerValue)
    };

    const getAllCorporateValues = {
      ...values,
      dob,
      emailalert: Number(emailalert),
      smsalert: Number(smsalert),
      idIssueDate,
      idExpryDate,
      introType: val,
      nin: isEditing ? values.nin : values.natIDNo
    };

    if (customerType === 'corporate') {
      mutateCorporateCustomer(getAllCorporateValues);
      return;
    }

    await mutate(getAllValues);
  };

  React.useEffect(() => {
    if (isEditing && !isCustomerResultLoading) {
      handleCompletedFields(customerResult);
    }

    if (!isEditing) {
      // Reset completion progress when creating a new customer
      setCompleted(progressCompletionInitialValues);
    }
  }, [customerResult, isEditing]);

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  React.useEffect(() => {
    if (customerResult?.customerType === individual) {
      setCustomerType('individual');
    }

    if (customerResult?.customerType === corporate) {
      setCustomerType('corporate');
    }
  }, [customerResult, setCustomerType]);

  if (isEditing && isCustomerResultLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  const pickInitialValues =
    customerType === 'corporate'
      ? createCorporateCustomerInitialValues
      : createCustomerInitialValues;

  const pickSchema =
    customerType === 'corporate'
      ? Yup.object({ ...corporateCustomerPersonalDetails })
      : Yup.object({
          ...createCustomer,
          ...individualCustomerPersonalDetails,
          ...(isEditing
            ? handleInconsistencyForPersonalDetailsEditMode
            : handleInconsistencyForPersonalDetailsCreateMode)
        });

  const sex = customerResult?.sex === 'Male' ? '1' : '0';

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopActionsArea actionButtons={actionButtons} />
      <Box
        sx={{
          paddingX: '25px',
          width: '100%'
        }}
      >
        <PageTitle
          title={`${isEditing ? 'Edit Customer' : 'Create Customer'}`}
          styles={BatchTitle}
        />

        <Formik
          onSubmit={(values) => onSubmit(values)}
          enableReinitialize
          initialValues={
            // Hardcoded relationtype as string and menu id as number, we need to get more context as to what it is
            isEditing
              ? {
                  acctOfficer: customerResult?.acctOfficer,
                  address: customerResult?.address,
                  address2: customerResult?.address2,
                  bizAddress: customerResult?.bizAddress,
                  bizCtry: customerResult?.bizCtry,
                  bizPhone3: customerResult?.bizPhone3,
                  bizState: customerResult?.bizState,
                  bizTowncode: customerResult?.bizTowncode,
                  branchcode: customerResult?.branchcode,
                  bvn: customerResult?.bvn,
                  ctzorRes: customerResult?.ctzorRes,
                  dob: dayjs(customerResult?.dob),
                  eduLevel: customerResult?.eduLevel,
                  email: customerResult?.email,
                  empBusName: customerResult?.empBusName ?? '',
                  fatcaid: customerResult?.fatcaid ?? '',
                  firstName: customerResult?.firstName,
                  groupcode: customerResult?.groupcode,
                  iDno: customerResult?.iDno,
                  idExpryDate: dayjs(customerResult?.idExpryDate),
                  idIssueDate: dayjs(customerResult?.idIssueDate),
                  idType: customerResult?.idType,
                  introType: customerResult?.introType,
                  introid: customerResult?.introid,
                  menuid: 35,
                  mothermdName: customerResult?.mothermdName,
                  natIDNo: customerResult?.natIDNo,
                  nationality: customerResult?.nationality,
                  nextOfKin: customerResult?.nextOfKin,
                  nextOfKinRel: customerResult?.nextOfKinRel,
                  nextOfKinState: customerResult?.nextOfKinState,
                  nextOfKinaddr: customerResult?.nextOfKinaddr,
                  nextOfKintown: customerResult?.nextOfKintown,
                  nextOfKinphone: customerResult?.nextOfKinphone,
                  nin: customerResult?.natIDNo,
                  occupation: customerResult?.occupation,
                  othername: customerResult?.othername,
                  phone1: customerResult?.phone1,
                  phone2: customerResult?.phone2,
                  phone3: customerResult?.phone3,
                  phone4: customerResult?.phone4,
                  psprtAlnNO: customerResult?.psprtAlnNO ?? '',
                  psprtExpDate: customerResult?.psprtExpDate
                    ? dayjs(customerResult?.psprtExpDate)
                    : today,
                  psprtIssDate: customerResult?.psprtIssDate
                    ? dayjs(customerResult?.psprtIssDate)
                    : today,
                  refname: customerResult?.refname,
                  refphone: customerResult?.refphone,
                  relcustid: customerResult?.relcustid === '1' ? '1' : '0',
                  relationtype: customerResult?.relationtype ?? '',
                  residentCountry: customerResult?.residentCountry,
                  residentStatecode: customerResult?.residentStatecode,
                  residentTowncode: customerResult?.residentTowncode,
                  residExpDate: customerResult?.residExpDate
                    ? dayjs(customerResult?.residExpDate)
                    : today,
                  residPermDate: customerResult?.residPermDate
                    ? dayjs(customerResult?.residPermDate)
                    : today,
                  residPermNo: customerResult?.residPermNo ?? '',
                  sectorcode: customerResult?.sectorcode?.toString().trim(),
                  sex,
                  sigClass: customerResult?.sigClass,
                  signacct: customerResult?.signacct,
                  smsalert: customerResult?.smsalert,
                  ssn: customerResult?.ssn ?? '',
                  staffOrDirector: 0, // hardcoded as 0 for now
                  statecode: customerResult?.statecode,
                  surName: customerResult?.surName,
                  taxIDNo: customerResult?.taxIDNo,
                  title: customerResult?.title,
                  zipcode: customerResult?.zipCode ?? '',
                  shareCapital: customerResult?.shareCapital ?? '',
                  turnOver: customerResult?.turnOver ?? '',
                  compname: customerResult?.fullname,
                  regno: customerResult?.regno,
                  companyStatecode: customerResult?.companyStatecode,
                  companyTowncode: customerResult?.companyTowncode,
                  companyAddress: customerResult?.companyAddress
                }
              : pickInitialValues
          }
          validationSchema={pickSchema}
        >
          <Form>
            {customerType === 'corporate' ? (
              <div>
                <CorporateCustomerPersonalDetailsForm
                  sectors={sectors}
                  countries={countries}
                  states={states}
                  towns={towns}
                  professions={professions}
                  officers={officers}
                  groups={groups}
                  branches={branches}
                />
              </div>
            ) : (
              <div>
                <TrackVisitedFields isEditing={isEditing} />
                {areOfficersLoading ||
                arebranchesLoading ||
                areGroupsLoading ||
                areTitlesLoading ||
                aresectorsLoading ||
                areEducationLoading ||
                areOccupationsLoading ? (
                  <FormSkeleton noOfLoaders={1} />
                ) : (
                  <ShortCardWithAccordion
                    cardTitle="Personal Details"
                    cardKey="personalDetails"
                    completed={completed}
                    titles={title}
                    sectors={sectors}
                    education={education}
                    countries={countries}
                    states={states}
                    towns={towns}
                    professions={professions}
                    officers={officers}
                    groups={groups}
                    branches={branches}
                  />
                )}

                {areStatesLoading || areContriesLoading || areTownsLoading ? (
                  <FormSkeleton noOfLoaders={1} />
                ) : (
                  <ShortCardWithAccordion
                    cardTitle="Business/Office/School Details"
                    cardKey="businessDetails"
                    completed={completed}
                    countries={countries}
                    states={states}
                    towns={towns}
                  />
                )}

                {areRelationshipsLoading ||
                areStatesLoading ||
                areTownsLoading ? (
                  <FormSkeleton noOfLoaders={1} />
                ) : (
                  <ShortCardWithAccordion
                    cardTitle="Next of Kin Details"
                    cardKey="nextOfKinDetails"
                    completed={completed}
                    relationships={relationships}
                    states={states}
                    towns={towns}
                  />
                )}

                {areIdsLoading ? (
                  <FormSkeleton noOfLoaders={1} />
                ) : (
                  <ShortCardWithAccordion
                    cardTitle="Identification Details"
                    cardKey="identificationDetails"
                    completed={completed}
                    idCards={idCards}
                  />
                )}

                {areOfficersLoading ||
                arebranchesLoading ||
                areGroupsLoading ? (
                  <FormSkeleton noOfLoaders={1} />
                ) : (
                  <ShortCardWithAccordion
                    cardTitle="Referrer’s Details"
                    cardKey="referrerDetails"
                    hideCompleted
                    officers={officers}
                    groups={groups}
                    branches={branches}
                  />
                )}
              </div>
            )}
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
