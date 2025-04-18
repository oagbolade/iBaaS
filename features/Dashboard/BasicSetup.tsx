import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  basicSetupContainer,
  completedPercentageText,
  mainSetupContainer,
  settingSubText,
  setupTextAndPercentage
} from './styles';
import { SetupTask } from './SetupTask';
import { primaryTitle } from '@/components/Confirmation/styles';
import { ProgressBar } from '@/components/ProgressBar';
import { FormSkeleton } from '@/components/Loaders';




interface SetupTaskProps {
  label: string;
  isChecked: boolean;
  link: string;
  linkText: string;
}

interface BasicSetupProps {
  isBranchLoading: boolean,
  isProductTypeLoading: boolean,
  isDepartmentLoading: boolean,
  isGLLoading: boolean,
  isChargeLoading: boolean,
  tasks: SetupTaskProps[],
  completionPercentage: number

}




export const BasicSetup = ({ isBranchLoading, isChargeLoading, isDepartmentLoading, isGLLoading,
  isProductTypeLoading, tasks,
  completionPercentage }: BasicSetupProps) => {


  if (
    isBranchLoading ||
    isProductTypeLoading ||
    isDepartmentLoading ||
    isGLLoading ||
    isChargeLoading
  ) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box mt={2} sx={basicSetupContainer}>
      <Typography sx={primaryTitle}>
        Let&apos;s start with the basics
      </Typography>
      <Box sx={setupTextAndPercentage}>
        <Typography sx={settingSubText}>
          Get more by setting up your account profile
        </Typography>
        <Typography sx={completedPercentageText}>
          {completionPercentage.toFixed(0)}% completed
        </Typography>
      </Box>
      <Box sx={{ margin: '20px 0' }}>
        <ProgressBar progress={Number(completionPercentage.toFixed(0))} />
      </Box>

      <Box sx={mainSetupContainer}>
        {tasks.map((task, index) => (
          <SetupTask
            key={index}
            label={task.label}
            isChecked={task.isChecked}
            link={task.link}
            linkText={task.linkText}
          />
        ))}
      </Box>
    </Box>
  );
};
