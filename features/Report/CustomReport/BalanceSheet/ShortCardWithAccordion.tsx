import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Stack, Divider, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AccordionWrapper } from '../GroupReport/ShortCardWithAccordion';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { TextInput } from '@/components/FormikFields';
import { AssetsTable, IData } from '@/components/Table/AssetsTable';
import { useGetAllBalanceSheetByItemId } from '@/api/reports/useGetBalanceSheet';
import { FormSkeleton } from '@/components/Loaders';
import { ActionButton } from '@/components/Revamp/Buttons';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { renderEmptyTableBody } from '@/components/Table/Table';
import { IBalanceSheetByItemIdList } from '@/api/ResponseTypes/reports';

const Accordion = styled((props: AccordionProps) => {
  return <MuiAccordion {...props} />;
})(() => {
  return {
    width: '100%', // uses 1117px in figma
    minHeight: '83px',
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none',
    marginBottom: '20px',
  };
});

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props} />;
})(() => {
  return {
    cursor: 'pointer',
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '40px',
      padding: '20px 24px 5px 16px',
    },
  };
});

const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: '20px 24px 30px 16px',
  };
});

const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        textAlign: 'right',
      }}
    >
      {title}
    </Typography>
  );
};

const Value = ({ title }: { title: any }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '24px',
        textAlign: 'right',
      }}
    >
      {title}
    </Typography>
  );
};

export const GrandTotal = ({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: `${colors.primaryBlue500}`,
        color: `${colors.white}`,
        padding: '20px 10px',
      }}
    >
      <Typography
        sx={{ fontSize: '14px', fontWeight: 300, paddingLeft: '10px' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '24px',
          paddingRight: '6rem',
        }}
      >
        {amount}
      </Typography>
    </Box>
  );
};

type Props = {
  column: Array<string>;
  defaultData: IData[];
  itemcode: string;
  title: string;
  assetCount: number;
  assetValue: string | number;
};

export const ShortCardWithAccordion = ({
  column,
  defaultData,
  itemcode,
  title,
  assetCount,
  assetValue,
}: Props) => {
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = React.useState<string>('');
  const [page, setPage] = React.useState(1);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  const { data: detailData, isLoading } = useGetAllBalanceSheetByItemId({
    itemcode,
    page: 1,
    pageSize: 10,
    getAll: false,
    searchWith: activeSearchTerm,
  });

  const tableData = React.useMemo(() => {
    if (expanded && detailData?.length) {
      return detailData.map((item) => ({
        assets: item.itemDesc || '',
        amount: `${formatCurrency(item.sumbalance)}`,
        itemid: item.itemid,
        groupname: item.itemDesc,
        balance: item.sumbalance,
      })) as IData[];
    }
    return defaultData;
  }, [detailData, defaultData, expanded]);

  const total = React.useMemo(() => {
    if (!detailData) return 0;
    return detailData
      .reduce((sum, item) => sum + parseFloat(item.sumbalance || '0'), 0)
      .toFixed(2);
  }, [detailData]);

  return (
    <AccordionWrapper>
      <Accordion expanded={expanded} onChange={() => handleChange()}>
        <AccordionSummary>
          <Grid
            container
            ref={expandRef}
            spacing={2}
            direction="row"
            justifyContent="space-between"
            my={2.8}
            sx={{ width: '100%' }}
          >
            <Grid item mobile={12} tablet={3} justifyContent="center">
              <Typography
                sx={{
                  color: colors.neutral1000,
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '32px',
                }}
              >
                {title}
              </Typography>
            </Grid>

            <Grid item mobile={6} tablet={2} desktop={2}>
              <Stack>
                <Title title="Number of Assets" />
                <Value title={assetCount} />
              </Stack>
            </Grid>

            <Grid item mobile={6} tablet={2} desktop={2}>
              <Stack>
                <Title title="Value" />
                <Value title={assetValue} />
              </Stack>
            </Grid>

            <Grid
              item
              mobile={6}
              tablet={2}
              desktop={2}
              sx={{ textAlign: 'right' }}
            >
              <Box
                sx={{
                  marginBottom: expanded ? '35px' : 0,
                  transform: expanded ? 'rotate(180deg)' : 'none',
                  display: 'inline-block',
                }}
                mt={1.2}
              >
                <ChevronDown color={colors.neutral900} />
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Divider light />
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px',
              marginTop: '20px',
              marginBottom: '30px',
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <TextInput
                name="Search"
                placeholder="Search"
                icon={<SearchIcon />}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </Box>
            <ActionButton
              customStyle={{
                backgroundColor: `${colors.activeBlue400}`,
                border: `1px solid ${colors.activeBlue400}`,
                color: `${colors.white}`,
                height: '40px',
              }}
              type="button"
              buttonTitle="Search"
              onClick={handleSearch}
            />
          </Box>

          {isLoading ? (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
              <FormSkeleton noOfLoaders={3} />
            </Box>
          ) : detailData?.length ? (
            <AssetsTable
              tableConfig={{
                paintedColumns: ['Assets', 'Amount'],
                totalRow: ['Total', `${formatCurrency(total)}`],
              }}
              columns={column}
              data={tableData || []}
              setPage={setPage}
              page={page}
            />
          ) : (
            <>
              {renderEmptyTableBody(detailData as IBalanceSheetByItemIdList[])}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </AccordionWrapper>
  );
};