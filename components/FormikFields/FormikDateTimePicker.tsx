// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { Typography, Box, InputLabel } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import styled from 'styled-components';
// import { Field, ErrorMessage, FieldProps } from 'formik';
// import { StyledTextInput } from './FormTextInput';
// import { asterix, labelTypography } from '@/components/FormikFields/styles';
// import colors from '@/assets/colors';
// import { TextError } from '@/components/Forms';
// import { useGetSystemDate } from '@/api/general/useSystemDate';

// type Props = {
//   label: string;
//   name?: string;
//   className?: string;
//   handledValue?: Dayjs | string | null;
//   required?: boolean;
//   disabled?: boolean;
//   disableFuture?: boolean;
//   handleDateChange?: Function;
//   value?: string | Dayjs;
//   defaultValue?: string | Dayjs;
//   minDate?: Dayjs;
//   maxDate?: Dayjs;
// };

// const DateTimeWrapper = styled.section`
//   .MuiInputBase-root {
//     border-radius: 4px;
//     border: ${colors.neutral200};
//     background: ${colors.neutral200};
//     color: ${colors.neutral600};
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 24px;
//   }

//   .MuiFormControl-root {
//     width: 100%;
//   }

//   .MuiFormControl-root:hover {
//     border-radius: 4px;
//     border: ${colors.neutral200};
//     background: ${colors.neutral200};
//   }

//   .MuiTypography-root {
//     display: inline;
//   }
// `;

// export const FormikDateTimePicker = ({
//   name = 'default',
//   label,
//   required,
//   className,
//   value,
//   disabled,
//   defaultValue,
//   handleDateChange,
//   disableFuture,
//   minDate,
//   maxDate,
// }: Props) => {
//   const today = value ?? defaultValue ?? dayjs();
//   const { sysmodel, isLoading } = useGetSystemDate();
//   const systemDate = sysmodel?.systemDate;
//   const [hasSetInitialValue, setHasSetInitialValue] = React.useState(false);

//   console.log('System Date:', systemDate);

//   return (
//     <Box sx={{ marginBottom: '15px' }}>
//       <Field>
//         {({ field, form }: FieldProps) => {
//           const { setFieldValue } = form;
//           // Effect to set initial system date
//           React.useEffect(() => {
//             // Only set if field is empty, system date is available, and not currently loading
//             if (!field.value && systemDate && !isLoading) {
//               const systemDateAsDayjs = dayjs(systemDate);
//               setFieldValue(name, systemDateAsDayjs);
//             }
//           }, [systemDate, field.value, setFieldValue, name, isLoading]);

//           // Determine the current value to display
//           const getCurrentValue = () => {
//             // Priority: field.value > value prop > system date > defaultValue > null
//             if (field.value) {
//               return dayjs(field.value);
//             }
//             if (value) {
//               return dayjs(value);
//             }
//             if (systemDate && !isLoading) {
//               return dayjs(systemDate);
//             }
//             if (defaultValue) {
//               return dayjs(defaultValue);
//             }
//             return null;
//           };

//           const currentValue = getCurrentValue();
//           return (
//             <DateTimeWrapper>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <Typography sx={labelTypography}>{label}</Typography>
//                 {required && <Typography sx={asterix}>*</Typography>}
//                 <StyledTextInput>
//                   <InputLabel sx={{ display: 'none' }} id={label}>
//                     {label}
//                   </InputLabel>
//                   <DatePicker
//                     data-testid={name}
//                     label={label}
//                     disabled={disabled}
//                     disableFuture={disableFuture}
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     className={className}
//                        value={currentValue}
//                     // defaultValue={systemDate || defaultValue}
//                     // value={field.value || null}
//                     // value={today || field.value}
//                     onChange={(newValue) => {
//                       if (handleDateChange) {
//                         handleDateChange(newValue);
//                       }
//                       return setFieldValue(name as string, newValue);
//                     }}
//                   />
//                 </StyledTextInput>
//                 <ErrorMessage component={TextError} name={name} />
//               </LocalizationProvider>
//             </DateTimeWrapper>
//           );
//         }}
//       </Field>
//     </Box>
//   );
// };

// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { Typography, Box, InputLabel } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import styled from 'styled-components';
// import { Field, ErrorMessage, FieldProps } from 'formik';
// import { StyledTextInput } from './FormTextInput';
// import { asterix, labelTypography } from '@/components/FormikFields/styles';
// import colors from '@/assets/colors';
// import { TextError } from '@/components/Forms';
// import { useGetSystemDate } from '@/api/general/useSystemDate';

// type Props = {
//   label: string;
//   name?: string;
//   className?: string;
//   handledValue?: Dayjs | string | null;
//   required?: boolean;
//   disabled?: boolean;
//   disableFuture?: boolean;
//   handleDateChange?: Function;
//   value?: string | Dayjs;
//   defaultValue?: string | Dayjs;
//   minDate?: Dayjs;
//   maxDate?: Dayjs;
// };

// const DateTimeWrapper = styled.section`
//   .MuiInputBase-root {
//     border-radius: 4px;
//     border: ${colors.neutral200};
//     background: ${colors.neutral200};
//     color: ${colors.neutral600};
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 24px;
//   }

//   .MuiFormControl-root {
//     width: 100%;
//   }

//   .MuiFormControl-root:hover {
//     border-radius: 4px;
//     border: ${colors.neutral200};
//     background: ${colors.neutral200};
//   }

//   .MuiTypography-root {
//     display: inline;
//   }
// `;

// export const FormikDateTimePicker = ({
//   name = 'default',
//   label,
//   required,
//   className,
//   value,
//   disabled,
//   defaultValue,
//   handleDateChange,
//   disableFuture,
//   minDate,
//   maxDate,
// }: Props) => {
//   const { sysmodel, isLoading } = useGetSystemDate();
//   const systemDate = sysmodel?.systemDate;

//   return (
//     <Box sx={{ marginBottom: '15px' }}>
//       <Field name={name}>
//         {({ field, form }: FieldProps) => {
//           const { setFieldValue, values } = form;

//           React.useEffect(() => {
//             if (!field.value && systemDate && !isLoading) {
//               const systemDateAsDayjs = dayjs(systemDate);

//               setFieldValue(name, systemDateAsDayjs);
//             }
//           }, [systemDate, field.value, setFieldValue, name, isLoading]);

//           const getCurrentValue = () => {
//             if (field.value) {
//               return dayjs.isDayjs(field.value)
//                 ? field.value
//                 : dayjs(field.value);
//             }

//             if (systemDate && !isLoading) {
//               return dayjs(systemDate);
//             }

//             if (defaultValue) {
//               return dayjs(defaultValue);
//             }

//             return null;
//           };

//           const currentValue = getCurrentValue();

//           return (
//             <DateTimeWrapper>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <Typography sx={labelTypography}>{label}</Typography>
//                 {required && <Typography sx={asterix}>*</Typography>}
//                 <StyledTextInput>
//                   <InputLabel sx={{ display: 'none' }} id={label}>
//                     {label}
//                   </InputLabel>
//                   <DatePicker
//                     data-testid={name}
//                     disabled={disabled}
//                     disableFuture={disableFuture}
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     className={className}
//                     value={currentValue}
//                     defaultValue={
//                       systemDate && !isLoading ? dayjs(systemDate) : undefined
//                     }
//                     onChange={(newValue) => {
//                       if (handleDateChange) {
//                         handleDateChange(newValue);
//                       }
//                       setFieldValue(name as string, newValue);
//                     }}
//                   />
//                 </StyledTextInput>
//                 <ErrorMessage component={TextError} name={name} />
//               </LocalizationProvider>
//             </DateTimeWrapper>
//           );
//         }}
//       </Field>
//     </Box>
//   );
// };



import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, Box, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { StyledTextInput } from './FormTextInput';
import { asterix, labelTypography } from '@/components/FormikFields/styles';
import colors from '@/assets/colors';
import { TextError } from '@/components/Forms';
import { useGetSystemDate } from '@/api/general/useSystemDate';

type Props = {
  label: string;
  name?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  disableFuture?: boolean;
  handleDateChange?: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
};

const DateTimeWrapper = styled.section`
  .MuiInputBase-root {
    border-radius: 4px;
    border: ${colors.neutral200};
    background: ${colors.neutral200};
    color: ${colors.neutral600};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiFormControl-root:hover {
    border-radius: 4px;
    border: ${colors.neutral200};
    background: ${colors.neutral200};
  }

  .MuiTypography-root {
    display: inline;
  }
`;

export const FormikDateTimePicker = ({
  name = 'default',
  label,
  required,
  className,
  disabled,
  handleDateChange,
  disableFuture,
  minDate,
  maxDate,
}: Props) => {
  const { sysmodel, isLoading } = useGetSystemDate();
  const systemDate = sysmodel?.systemDate;

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;

          React.useEffect(() => {
            if (!field.value && systemDate && !isLoading) {
              setFieldValue(name, dayjs(systemDate));
            }
          }, [systemDate, field.value, setFieldValue, name, isLoading]);

          return (
            <DateTimeWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography sx={labelTypography}>{label}</Typography>
                {required && <Typography sx={asterix}>*</Typography>}
                <StyledTextInput>
                  <InputLabel sx={{ display: 'none' }} id={label}>
                    {label}
                  </InputLabel>
                  <DatePicker
                    data-testid={name}
                    disabled={disabled}
                    disableFuture={disableFuture}
                    minDate={minDate}
                    maxDate={maxDate}
                    className={className}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      handleDateChange?.(newValue);
                      setFieldValue(name, newValue);
                    }}
                  />
                </StyledTextInput>
                <ErrorMessage component={TextError} name={name} />
              </LocalizationProvider>
            </DateTimeWrapper>
          );
        }}
      </Field>
    </Box>
  );
};
