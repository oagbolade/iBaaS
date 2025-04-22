'use client';
import { Box } from '@mui/material';
import { Dashboard } from '@/features/Dashboard';

import { useGetProductType } from '@/api/general/useProductType';
import { useFilterDepartmentSearch } from '@/api/setup/useDepartment';
import { useFilterGLNodeSearch } from '@/api/setup/useGeneralNode';
import { useFilterChargeSearch } from '@/api/setup/useCharges';
import { useFilterBranchSearch } from '@/api/setup/useSetUpBranches';

export default function DashboardPage() {
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

  const { productTypes = [], isLoading: isProductTypeLoading = false } =
    useGetProductType();

  const { data: departmentData = [], isDepartmentLoading } =
    useFilterDepartmentSearch({ page: 1 });

  return (
    <Box>
      <Dashboard
        branchData={branchData}
        glNodeData={glNodeData}
        chargeData={chargeData}
        productTypes={productTypes}
        departmentData={departmentData}
        isBranchLoading={isBranchLoading}
        isChargeLoading={isChargeLoading}
        isGLLoading={isGLLoading}
        isDepartmentLoading={isDepartmentLoading}
        isProductTypeLoading={isProductTypeLoading}
      />
    </Box>
  );
}
