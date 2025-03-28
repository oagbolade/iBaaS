import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Typography } from '@mui/material';
import { Field, ErrorMessage, FieldProps } from 'formik';
import styled from 'styled-components';
import { asterix } from './styles';
import {
  RadioButtonStyle,
  RadioButtonTitle
} from '@/components/Revamp/Radio/style';
import { TextError } from '@/components/Forms';

interface OptionsI {
  value: string | number;
  label: string;
}
type Props = {
  title?: string;
  value: string | number;
  options: OptionsI[];
  name: string;
  id?: string;
  className?: string;
  required?: boolean;
  handleCheck?: (value: boolean) => void;
};

function BpRadio(props: RadioProps) {
  return <Radio disableRipple color="default" {...props} />;
}

const RadioButtonWrapper = styled.section`
  .MuiTypography-root {
    display: inline;
  }
`;

/**
 * A React component that renders a radio button group with a title and options.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.id] - The unique identifier for the radio button group.
 * @param {string} [props.className] - The CSS class name for the radio button group.
 * @param {string} [props.title] - The title to display above the radio button group.
 * @param {string} props.value - The current value of the radio button group.
 * @param {string} props.name - The name of the radio button group.
 * @param {Array<{ value: string, label: string }>} props.options - The options to display in the radio button group.
 * @param {(value: boolean) => void} [props.handleCheck] - A callback function to handle changes to the radio button group.
 * @returns {JSX.Element} - The rendered radio button group.
 */
/**
 * A Formik-compatible radio button component that renders a group of radio buttons.
 *
 * @param id - The unique identifier for the radio button group.
 * @param className - The CSS class name to apply to the radio button group.
 * @param title - The title to display above the radio button group.
 * @param value - The initial value of the selected radio button.
 * @param name - The name of the radio button group.
 * @param options - An array of radio button options, each with a value and label.
 * @param handleCheck - An optional callback function that is called when the selected radio button changes.
 */
export const FormikRadioButton = ({
  id,
  className,
  title,
  value,
  name,
  options,
  handleCheck,
  required
}: Props) => {
  const [selectedValue, setValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const booleanValue = event.target.value === '1'; // Convert string to boolean directly
    if (handleCheck) {
      handleCheck(booleanValue);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <RadioButtonWrapper>
      <Box sx={{ marginBottom: '15px' }}>
        <Field name={name}>
          {({ field }: FieldProps) => (
            <FormControl>
              {title && (
                <FormLabel sx={{ ...RadioButtonTitle, display: 'inline' }}>
                  {title} {required && <Typography sx={asterix}>*</Typography>}
                </FormLabel>
              )}
              <button
                className={className}
                type="button"
                id={id}
                value={selectedValue}
                style={{ display: 'none' }}
              >
                Hidden
              </button>
              <RadioGroup
                defaultValue={value || selectedValue}
                onChange={handleChange}
                name={name}
              >
                <Box sx={RadioButtonStyle}>
                  {options.map((option) => {
                    return (
                      <FormControlLabel
                        key={option.value}
                        control={<BpRadio />}
                        label={option.label}
                        id={String(option.value)}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                      />
                    );
                  })}
                </Box>
                <ErrorMessage component={TextError} name={name} />
              </RadioGroup>
            </FormControl>
          )}
        </Field>
      </Box>
    </RadioButtonWrapper>
  );
};
