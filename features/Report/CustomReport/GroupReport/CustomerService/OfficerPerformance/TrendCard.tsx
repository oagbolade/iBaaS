import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  OfficerTrendSection,
  OfficeAmountTypography,
  OfficeTrendNumberTypography,
} from '@/features/Report/CustomReport/GroupReport/styles';
import { description } from '@/components/Confirmation/styles';
import {
  DownTrendIcon,
  NegativeTrendIcon,
  PositiveTrendIcon,
  UpTrendIcon,
} from '@/assets/svg';
import colors from '@/assets/colors';

type Props = {
  title: string;
  amount: string;
  isPositiveTrend: boolean;
  percentage: string;
};
export const TrendCard = ({
  title,
  amount,
  isPositiveTrend,
  percentage,
}: Props) => {
  return (
    <Stack direction="row" sx={OfficerTrendSection}>
      <Box>
        <Box>
          <Typography sx={description}>{title}</Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Box mt={3}>
            <Typography sx={OfficeAmountTypography}>{amount}</Typography>
          </Box>
          <Box mt={3} ml={3}>
            <Box>
              {isPositiveTrend ? <PositiveTrendIcon /> : <NegativeTrendIcon />}
            </Box>
            <Stack direction="row">
              <Box>
                <Typography
                  sx={{
                    ...OfficeTrendNumberTypography,
                    color: isPositiveTrend
                      ? `${colors.activeGreen300}`
                      : `${colors.primaryRedBase}`,
                  }}
                >
                  {percentage}
                </Typography>
              </Box>
              <Box>{isPositiveTrend ? <UpTrendIcon /> : <DownTrendIcon />}</Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
