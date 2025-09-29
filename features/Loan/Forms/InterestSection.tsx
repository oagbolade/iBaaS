import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { ContainerStyle } from './styles';
import { FormTextInput, FormikRadioButton } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';

interface InterestSectionProps {
  label: string;
  placeholder: string;
  sectionName: string;
  writeOffValue: string;
  writeOffActionType: string;
  restructureType: string;
  glAccountNumber: string;
  sectionValue?: string | number;
}

const ACTION_OPTIONS = [
  { label: 'Add', value: '1' },
  { label: 'Write Off', value: '2' },
  { label: 'Partial Write Off', value: '3' }
];

const FormField = ({
  name,
  placeholder,
  label,
  disabled,
  required = true,
  customStyle
}: any) => (
  <FormTextInput
    customStyle={customStyle}
    name={name}
    placeholder={placeholder}
    label={label}
    required={required}
    disabled={disabled}
  />
);

export const InterestSection: React.FC<InterestSectionProps> = ({
  label,
  placeholder,
  sectionName,
  writeOffValue,
  writeOffActionType,
  glAccountNumber,
  restructureType,
  sectionValue
}) => {
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (restructureType === '1') {
      const fieldsToReset = [
        { name: sectionName, value: sectionValue || '' },
        { name: writeOffActionType, value: '' },
        { name: writeOffValue, value: '' },
        { name: glAccountNumber, value: '' }
      ];

      fieldsToReset.forEach(({ name, value }) => setFieldValue(name, value));
    }
  }, [
    restructureType,
    sectionName,
    writeOffActionType,
    writeOffValue,
    glAccountNumber,
    setFieldValue,
    sectionValue
  ]);

  const commonStyles = {
    width: setWidth(isMobile ? '230px' : '100%')
  };

  return (
    <Box sx={ContainerStyle}>
      <Grid container>
        <Grid item={isTablet} mobile={12}>
          <FormField
            customStyle={commonStyles}
            name={sectionName}
            value={sectionName}
            placeholder={placeholder}
            label={label}
            disabled
          />
        </Grid>

        <Grid my={2} item={isTablet} mobile={12}>
          <FormikRadioButton
            options={ACTION_OPTIONS}
            title="Actions"
            name={writeOffActionType}
            value={writeOffActionType}
            disable={restructureType === '1'}
          />
        </Grid>

        <Grid item={isTablet} mobile={12}>
          <FormField
            customStyle={commonStyles}
            name={writeOffValue}
            placeholder=""
            label="Add Value"
            disabled={restructureType === '1'}
            required={false}
          />
        </Grid>

        <Grid item={isTablet} mobile={12}>
          <FormField
            customStyle={commonStyles}
            name={glAccountNumber}
            placeholder=""
            label="Enter GL Account"
            disabled={restructureType === '1'}
            required={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
