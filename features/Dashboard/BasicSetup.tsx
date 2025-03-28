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
import { useFilterBranchSearch } from '@/api/setup/useSetUpBranches';
import { FormSkeleton } from '@/components/Loaders';
import { useGetProductType } from '@/api/general/useProductType';
import { useFilterDepartmentSearch } from '@/api/setup/useDepartment';
import { useFilterGLNodeSearch } from '@/api/setup/useGeneralNode';
import { useFilterChargeSearch } from '@/api/setup/useCharges';

interface SetupTaskProps {
  label: string;
  isChecked: boolean;
  link: string;
  linkText: string;
}

export const BasicSetup = () => {
  const { data: branchData = [], isLoading: isBranchLoading } =
    useFilterBranchSearch({
      status: '1',
      page: 1,
      branchCode: null,
      branchName: null
    });

  const { data: glNodeData = [], isLoading: isGLLoading } =
    useFilterGLNodeSearch({
      status: '1',
      page: 1,
      gl_NodeCode: null,
      gl_ClassCode: null
    });

  const { data: chargeData = [], isLoading: isChargeLoading } =
    useFilterChargeSearch({
      chargeDesc: null,
      page: 1,
      chargeCode: null,
      status: '1'
    });

  const { productTypes = [], isLoading: isProductTypeLoading } =
    useGetProductType();

  const { data: departmentData = [], isDepartmentLoading } =
    useFilterDepartmentSearch({ page: 1 });

  const tasks: SetupTaskProps[] = [
    {
      label: 'Add Branches',
      isChecked: branchData.length > 0,
      link: '/setup/company/branch/',
      linkText: 'Add a branch'
    },
    {
      label: 'Add a product',
      isChecked: productTypes.length > 0,
      link: '/setup/product-gl/product-setup/',
      linkText: 'Add New Product'
    },
    {
      label: 'Add Department',
      isChecked: departmentData.length > 0,
      link: '/setup/company/department/',
      linkText: 'Add Department'
    },
    {
      label: 'Add General Ledger',
      isChecked: glNodeData.length > 0,
      link: '/setup/product-gl/product-class/',
      linkText: 'Add General Ledger'
    },
    {
      label: 'Add Charges',
      isChecked: chargeData.length > 0,
      link: '/setup/product-gl/charge/',
      linkText: 'Add Charges'
    }
  ];

  const completedTasks = tasks.filter((task) => task.isChecked).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  if (
    isBranchLoading &&
    isProductTypeLoading &&
    isDepartmentLoading &&
    isGLLoading &&
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
