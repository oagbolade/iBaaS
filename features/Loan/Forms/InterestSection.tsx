import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { ContainerStyle } from './styles';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { useFormikContext } from 'formik';

interface InterestSectionProps {
  label: string;
  placeholder: string;
  sectionName: string;
  writeOffValue: string;
  writeOffActionType: string;
  restructureType: boolean;
  glAccountNumber: string;
  sectionValue?: string | number;
}

const ACTION_OPTIONS = [
  { label: 'Add', value: '1' },
  { label: 'Write Off', value: '2' },
  { label: 'Partial Write Off', value: '3' }
];

const FormField = ({ name, placeholder, label, disabled, required = true, customStyle }: any) => (
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
    if (restructureType) {
      const fieldsToReset = [
        { name: sectionName, value: sectionValue || '' },
        { name: writeOffActionType, value: '' },
        { name: writeOffValue, value: '' },
        { name: glAccountNumber, value: '' }
      ];

      fieldsToReset.forEach(({ name, value }) => setFieldValue(name, value));
    }
  }, [restructureType, sectionName, writeOffActionType, writeOffValue, glAccountNumber, setFieldValue, sectionValue]);

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
            value={sectionValue?.toString()}
            placeholder={placeholder}
            label={label}
            disabled
          />
        </Grid>

        <Grid my={2} item={isTablet} mobile={12}>
          <RadioButtons
            options={ACTION_OPTIONS}
            title="Actions"
            name={writeOffActionType}
            value={writeOffActionType}
            disabled={restructureType}
          />
        </Grid>

        <Grid item={isTablet} mobile={12}>
          <FormField
            customStyle={commonStyles}
            name={writeOffValue}
            placeholder=""
            label="Add Value"
            disabled={restructureType}
          />
        </Grid>

        <Grid item={isTablet} mobile={12}>
          <FormField
            customStyle={commonStyles}
            name={glAccountNumber}
            placeholder=""
            label="Enter GL Account"
            disabled={restructureType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
