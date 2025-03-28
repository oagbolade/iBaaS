'use client';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { MobilePreviewContent } from '../Forms/BatchPosting';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import {
  BulkUpload,
  PreviewBulkUpload
} from '@/features/Operation/Forms/BulkUpload';
import { useCurrentBreakpoint } from '@/utils';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { bulkContentStyle } from '@/features/Operation/Forms/style';

export const BulkUploadContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const { setDirection } = useSetDirection();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Upload Document"
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];
  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction={setDirection()}>
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            <BulkUpload
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
            />
          </Box>
          <Box sx={{ marginTop: '60px' }}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={<PreviewBulkUpload />}
                customStyle={{ ...bulkContentStyle }}
              />
            ) : (
              <PreviewBulkUpload />
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};
