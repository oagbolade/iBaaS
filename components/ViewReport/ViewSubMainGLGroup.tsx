import React, { useState } from 'react';
import { Box, Stack, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { exportData } from './style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ExportIcon } from '@/assets/svg';
import {
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { TableV2 } from '@/components/Revamp/TableV2';
import {
  drillSubDownReportGlColumns,
  drilSubMainKey
} from '@/constants/Reports/COLUMNS';
import { ISearchParams } from '@/app/api/search/route';
import { useGetGlSubGroupReport } from '@/api/reports/useGetSubGroupResponse';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { FormSkeleton } from '@/components/Loaders';
import colors from '@/assets/colors';
import { DownloadReportContext } from '@/context/DownloadReportContext';

interface ActionMenuProps {
  detail: string;
}
const ActionMenu = ({ detail }: ActionMenuProps) => {
  return (
    <Link
      href={`/report/custom-report/view-report-node-class/?stepTwo=nodeClasss&detail=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      GL Accounts
    </Link>
  );
};

export const ViewSubGLReport: React.FC<{ detail: any }> = ({ detail }) => {
  const { setDirection } = useSetDirection();
  const [page, setPage] = useState(1);
  const [search] = useState<boolean>(true);
  const [searchParams] = useState<ISearchParams | null>(null);
  const { glSubGroupRptList, isLoading, totalRecords } = useGetGlSubGroupReport({
    ...searchParams,
    nodeCode: detail.gL_NodeCode,
    pageSize: '10'
  });

  const { glSubGroupRptList: downloadData } = useGetGlSubGroupReport({
    ...searchParams,
    getAll: true,
    nodeCode: detail.gL_NodeCode,
    pageSize: '10'
  });

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  React.useEffect(() => {
    if (!downloadData || downloadData?.pagedSubGroupReports?.length === 0) {
      setExportData([]);
      return;
    }

    if (
      Array.isArray(downloadData?.pagedSubGroupReports) &&
      downloadData.pagedSubGroupReports.length > 0
    ) {
      const reportData = downloadData?.pagedSubGroupReports.map((item) => ({
        GlName: item.gL_ClassName,
        GlCode: item.gL_ClassCode,
        total: item.total
      }));

      setReportType('GLSubMainGroupReport');
      setExportData(reportData as []);
    }
  }, [downloadData]);

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
            <BackButton />
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
                {detail.gl_NodeName || ''}
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
                {detail.gL_NodeCode || ''}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
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
            columns={drillSubDownReportGlColumns}
            data={glSubGroupRptList as unknown as []}
            keys={drilSubMainKey as []}
            hideFilterSection
            tableConfig={{
              hasActions: true,
              grandTotalRow: [
                'Grand Total',
                '',
                `NGN ${formatCurrency(glSubGroupRptList?.total || 0)}`,
                ''
              ]
            }}
            setPage={setPage}
            totalElements={totalRecords}
            page={page}
            ActionMenuProps={(dataItem: any) => (
              <ActionMenu detail={JSON.stringify(dataItem)} />
            )}
          />
        )}
      </Box>
    </Box>
  );
};
