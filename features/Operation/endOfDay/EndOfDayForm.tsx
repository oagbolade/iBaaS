/* eslint-disable no-undef */
'use client';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { string } from 'yup';
import {
  automaticContainer,
  numberOfDays,
  runEndofdayStyle,
  endOfdayTitle,
  timeEndofdayStyle
} from './style';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import {
  TypographyButton,
  TypographyConfirm,
  ButtonContainer,
  ButtonColorStyle,
  ButtonText,
  CancelButton,
  ConfirmButton,
  AccountPasswordContainer,
  AccountPasswordTitleContainer,
  AccountPasswordTitle,
  AccountTitle,
  AccountPasswordBodyContainer
} from '@/components/Revamp/Modal/style';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { handleRedirect, useCurrentBreakpoint } from '@/utils';
import { RadioButtons2 } from '@/components/Revamp/Radio/RadioButton2';
import { cancelButton } from '@/features/Requests/styles';
import {
  useCreateEODConfiguration,
  useCreateRunEOD,
  useGetEODConfiguration
} from '@/api/operation/useEndOfDay';
import { CreateEODConfigureFormValues } from '@/api/ResponseTypes/operation';

type Props = {
  handleClose: Function;
  closeModalQuickly?: Function;
};
export const EndOfDayForm = ({ handleClose, closeModalQuickly }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { isLoading, data } = useGetEODConfiguration();
  const { mutate, isPending } = useCreateEODConfiguration();
  const router = useRouter();
  const [addValues, setAddValues] = useState<any>();
  const [selectedDays, setSelectedDays] = useState<{ daysOfWeek: string }[]>(
    []
  );
  const [selectedTime, setSelectedTime] = useState<string>('18:00:00'); // Default time
  const handleChange = (value: string) => {
    setAddValues(value);
  };
  const handleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.some((d) => d.daysOfWeek === day)
        ? prev.filter((d) => d.daysOfWeek !== day)
        : [...prev, { daysOfWeek: day }]
    );
  };
  const handleTimeSelection = (time: string) => {
    setSelectedTime((prev) => (prev === time ? '' : time));
  };
  const handleContinue = () => {
    const getAll: CreateEODConfigureFormValues = {
      days:
        selectedDays.length > 0
          ? selectedDays
          : [{ daysOfWeek: selectedDays.toString() }],
      options: Number(addValues),
      time: selectedTime
    };
    mutate(getAll, {
      onSuccess: () => {
        handleClose(); // Close the modal on successful configuration
        router.push('/operation/endOfDay/');
      }
    });
  };
  return (
    <Box sx={AccountPasswordContainer}>
      <Box sx={AccountPasswordTitleContainer}>
        <Box sx={AccountPasswordTitle}>
          <PageTitle
            title="Configure End of Day"
            styles={{ ...AccountTitle }}
          />
          <IconButton
            onClick={() => closeModalQuickly?.() || handleClose(null)}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Box sx={AccountPasswordBodyContainer}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <RadioButtons2
            className="permissionOptions"
            options={[
              { label: 'Manual', value: 0 },
              { label: 'Automatic', value: 1 }
            ]}
            // title="You get to run end of day at your own convenience"
            name="options"
            customStyle={{
              display: 'flex'
            }}
            value={addValues}
            handleCheck={(value: string) => handleChange(value)}
          />
        </Box>
      </Box>
      {addValues === '1' && (
        <Box sx={automaticContainer}>
          <PageTitle
            title="Select preferred days to run End of Day"
            styles={{ ...endOfdayTitle }}
          />
          <Box
            sx={{
              ...numberOfDays,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            {data?.days &&
              data.days.length > 0 &&
              data.days.map((item) => (
                <PrimaryIconButton
                  key={item.daysOfWeek}
                  buttonTitle={item.daysOfWeek}
                  customStyle={{
                    ...cancelButton,
                    width: '80px', // Increased width for better readability
                    textAlign: 'center',
                    padding: '8px',
                    marginLeft: '30px',
                    backgroundColor: selectedDays.some(
                      (d) => d.daysOfWeek === item.daysOfWeek
                    )
                      ? colors.activeBlue400
                      : colors.neutral100,
                    color: selectedDays.some(
                      (d) => d.daysOfWeek === item.daysOfWeek
                    )
                      ? colors.white
                      : colors.neutral900
                  }}
                  onClick={() => handleDaySelection(item.daysOfWeek)}
                />
              ))}
          </Box>
        </Box>
      )}
      {addValues === '1' && (
        <Box sx={timeEndofdayStyle}>
          <PageTitle
            title="Select preferred time to run End of Day"
            styles={{ ...endOfdayTitle }}
          />
          <Box sx={numberOfDays}>
            <PrimaryIconButton
              buttonTitle={data?.time || '18:00:00'}
              customStyle={{
                ...cancelButton,
                padding: '8px',
                width: '80px', // Increased width for better readability
                textAlign: 'center',
                marginLeft: '30px',
                backgroundColor:
                  selectedTime === (data?.time || '18:00:00')
                    ? colors.activeBlue400
                    : colors.neutral100,
                color:
                  selectedTime === (data?.time || '18:00:00')
                    ? colors.white
                    : colors.neutral900
              }}
              onClick={() => handleTimeSelection(data?.time || '18:00:00')}
            />
          </Box>
        </Box>
      )}
      <Box sx={ButtonContainer}>
        <Box sx={ButtonColorStyle}>
          <Box sx={ButtonText}>
            <Box sx={{ ...CancelButton, background: 'none' }}>
              <PrimaryIconButton
                onClick={() => closeModalQuickly?.() || handleClose(null)}
                buttonTitle="Cancel"
                customStyle={{
                  ...TypographyButton,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  padding: { mobile: '0 50px' }
                }}
              />
            </Box>
            <Box sx={{ ...ConfirmButton, background: 'none' }}>
              <PrimaryIconButton
                buttonTitle={isPending ? 'Loading...' : 'Continue'}
                customStyle={{
                  ...TypographyConfirm,
                  backgroundColor: `${colors.activeBlue400}`,
                  width: `${isMobile ? '80px' : '131px'}`,
                  height: '40px',
                  borderRadius: '6px',
                  padding: { mobile: '8px 50px', desktop: '16px 78px' },
                  marginRight: { mobile: '70px', desktop: 0 }
                }}
                disabled={isPending}
                onClick={handleContinue}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
