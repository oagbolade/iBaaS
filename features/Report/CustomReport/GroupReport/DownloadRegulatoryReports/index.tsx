import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { exportData } from '../../style';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { useEfassReport } from '@/api/reports/useEfassReport';

export const DownloadAllRegulatory = () => {
  const { mutate } = useEfassReport();
  const handleClick = () => {};
  return (
    <Box>
      <ActionButtonWithPopper
        searchGroupVariant="ExportReport"
        customStyle={{ ...exportData }}
        icon={<ExportIcon />}
        iconPosition="start"
        buttonTitle=""
        onClick={handleClick}
      />
    </Box>
  );
};
