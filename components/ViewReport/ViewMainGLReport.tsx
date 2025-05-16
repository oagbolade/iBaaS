import React, { useState } from 'react';
import { Box, Stack, Typography, Paper } from '@mui/material';
import { exportData } from './style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ExportIcon } from '@/assets/svg';
import {
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { TableV2 } from '@/components/Revamp/TableV2';
import {
  drillClassCodeDownReportGlColumns,
  drillKeys
} from '@/constants/Reports/COLUMNS';
import { ISearchParams } from '@/app/api/search/route';
import { useGlNodeClassReport } from '@/api/reports/useGetSubGroupResponse';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { FormSkeleton } from '@/components/Loaders';
import colors from '@/assets/colors';
import { DownloadReportContext } from '@/context/DownloadReportContext';

export const ViewMainGLReport: React.FC<{ detail: any }> = ({ detail }) => {
  const { setDirection } = useSetDirection();
  const [page, setPage] = useState(1);
  const [search] = useState<boolean>(true);
  const [searchParams] = useState<ISearchParams | null>(null);

  const { glClassCodeRptList, isLoading } = useGlNodeClassReport({
    ...searchParams,
    gl_ClassCode: detail.gL_ClassCode,
    branchCode: '001', // get this from the backend when its avaiable (from query params)
    getAll: false,
    pageSize: '10'
  });

  const { setReportType, setExportData, readyDownload } = React.useContext(
    DownloadReportContext
  );

  React.useEffect(() => {
    setReportType('GLAccountClassReport');
    if (
      readyDownload &&
      Array.isArray(glClassCodeRptList?.pagedAccountsByClassCode) &&
      glClassCodeRptList.pagedAccountsByClassCode.length > 0
    ) {
      const reportdata = glClassCodeRptList?.pagedAccountsByClassCode.map(
        (item) => ({
          Branchname: item.branchName,
          BranchCode: item.branchCode,
          AccountName: item.acctName,
          GlNumber: item.glNumber,
          balance: item.bkbalance
        })
      );
      setExportData(reportdata as []);
    }
  }, [
    isLoading,
    readyDownload,
    setExportData,
    glClassCodeRptList,
    setReportType
  ]);
  return (
    <Box marginTop={10}>
      <Stack
        sx={{
          borderBottom: '1px solid #E8E8E8',
          marginTop: '24px',
          paddingX: '24px'
        }}
        direction={setDirection()}
        justifyContent="space-between"
      >
        <Box>
          <Box mt={2.3}>
            <Box>
              <BackButton />
            </Box>
          </Box>
        </Box>
        <Stack
          mt={1}
          direction={setDirection()}
          spacing={2}
          justifyContent="space-between"
        >
          <Box>
            <ActionButtonWithPopper
              searchGroupVariant="ExportReport"
              customStyle={{ ...exportData }}
              icon={<ExportIcon />}
              iconPosition="start"
              buttonTitle="Export Data"
            />
          </Box>
        </Stack>
      </Stack>

      <Box marginTop={5} sx={{ mb: 4, px: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: `1px solid ${colors.neutral300}`,
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            gap={50}
          >
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '14px', fontWeight: 500 }}
              >
                GL NODE NAME
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontSize: '16px', fontWeight: 600 }}
              >
                {detail.gL_ClassName || ''}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '14px', fontWeight: 500 }}
              >
                GL NODE CODE
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontSize: '16px', fontWeight: 600 }}
              >
                {detail.gL_ClassCode || ''}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '14px', fontWeight: 500 }}
              >
                TOTAL
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontSize: '16px', fontWeight: 600 }}
              >
                ₦{formatCurrency(detail?.total || 0)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <TableV2
            isSearched={search}
            columns={drillClassCodeDownReportGlColumns}
            data={glClassCodeRptList?.pagedAccountsByClassCode || []}
            keys={drillKeys as []}
            hideFilterSection
            tableConfig={{
              hasActions: false,
              grandTotalRow: [
                'Grand Total',
                '',
                '',
                `NGN ${formatCurrency(glClassCodeRptList?.total || 0)}`
              ]
            }}
            setPage={setPage}
            page={page}
          />
        )}
      </Box>
    </Box>
  );
};
