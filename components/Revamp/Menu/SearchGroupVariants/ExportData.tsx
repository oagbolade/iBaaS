import React from 'react';
import {
  Box,
  ClickAwayListener,
  FormControlLabel,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { applyFilterButton, checkboxSearchgroupContainer } from '../styles';
import { ExportCSVIcon, ExportPDFIcon, ExportXLSIcon } from '@/assets/svg';
import { PrimaryIconButton } from '@/components/Buttons';
import colors from '@/assets/colors';
import { primaryTitle } from '@/components/Confirmation/styles';
import { downloadReport, ReportFormat } from '@/utils/downloadReport';
import { DownloadReportContext } from '@/context/DownloadReportContext';

type Props = {
  handleClose: any;
};

const CustomizedRadioLabel = styled(FormControlLabel)(
  () => `
  .MuiFormControlLabel-label{
    line-height: 24px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Averta Regular';
  }
`
);

export const ExportData = ({ handleClose }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [reportFormat, setReportformat] = React.useState<ReportFormat>('pdf');
  const { exportData, reportType, reportQueryParams, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportformat((event.target as HTMLInputElement).value as ReportFormat);
  };

  const exportReport = async () => {
    if (!exportData || exportData?.length === 0) {
      return;
    }

    try {
      setLoading(true);
      setReadyDownload(true);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });

      const checkDataAvailable = () => {
        if (exportData && exportData?.length > 0) {
          downloadReport({
            exportData,
            reportFormat,
            reportType,
            reportQueryParams
          });
          handleClose();
          setLoading(false);
          setReadyDownload(false);
        } else {
          setTimeout(checkDataAvailable, 100);
        }
      };

      checkDataAvailable();
    } catch (error) {
      setLoading(false);
      setReadyDownload(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          ...checkboxSearchgroupContainer,
          width: { mobile: '100%', desktop: '400px' },
          height: '390px',
          borderRadius: '12px',
          padding: '16px 24px'
        }}
      >
        <Box mb={2.5}>
          <Typography sx={{ ...primaryTitle }}>Export Report</Typography>
        </Box>

        <Divider sx={{ marginBottom: '30px' }} />

        <FormControl>
          <FormLabel
            id="export-as-label"
            htmlFor="export-as-radio-group"
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              color: `${colors.darkGrayishBlue}`,
              lineHeight: '20px'
            }}
          >
            EXPORT AS
          </FormLabel>
          <RadioGroup
            id="export-as-radio-group"
            aria-labelledby="export-as-label"
            defaultValue="pdf"
            name="radio-buttons-group"
            onChange={handleChange}
            value={reportFormat}
          >
            <Stack direction="row">
              <CustomizedRadioLabel
                sx={{
                  fontSize: '12px'
                }}
                value="pdf"
                control={<Radio />}
                label="PDF File"
              />
              <Box mt={1}>
                <ExportPDFIcon />
              </Box>
            </Stack>

            <Stack direction="row">
              <CustomizedRadioLabel
                value="csv"
                control={<Radio />}
                label="CSV File"
              />
              <Box mt={1}>
                <ExportCSVIcon />
              </Box>
            </Stack>

            <Stack direction="row">
              <CustomizedRadioLabel
                value="excel"
                control={<Radio />}
                label="Excel File"
              />
              <Box mt={1}>
                <ExportXLSIcon />
              </Box>
            </Stack>
          </RadioGroup>
        </FormControl>

        <PrimaryIconButton
          isLoading={loading}
          onClick={exportReport}
          customStyle={{
            ...applyFilterButton,
            width: { mobile: '400px', desktop: '352px' }
          }}
          buttonTitle={loading ? 'Preparing Export...' : 'Export Report'}
          disabled={!exportData || exportData?.length === 0 || !reportType || !reportQueryParams}
        />
      </Box>
    </ClickAwayListener>
  );
};