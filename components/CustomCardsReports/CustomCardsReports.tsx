'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import {
  detailCardsArrow,
  detailsCards,
  detailsDescription,
  detailsTitle,
  detailsTitleContainer,
  viewDetails
} from './style';
import colors from '@/assets/colors';

type Props = {
  title: string;
  description: string;
  link?: string;
  disable?: boolean;
};

export const CustomCardsReports = ({
  title,
  description,
  link = '',
  disable = false
}: Props) => {
  const [shouldDisable, setShouldDisable] = React.useState(false);
  React.useEffect(() => {
    setShouldDisable(disable);
  }, []);
  
  if (shouldDisable) {
    return null;
  }

  return (
    <Box sx={{ marginLeft: '16px' }}>
      <Card sx={detailsCards}>
        <CardContent sx={detailsTitleContainer}>
          <Box>
            <Typography sx={detailsTitle}>{title}</Typography>
          </Box>
          <Box>
            <Typography sx={detailsDescription}>{description}</Typography>
          </Box>
          <CardActions sx={detailCardsArrow}>
            <Stack direction="row" spacing={0.1}>
              <Link href={link}>
                <Typography sx={viewDetails}>View Details</Typography>
              </Link>
              <ArrowForwardOutlinedIcon
                sx={{
                  color: `${colors.primaryBlue500}`,
                  marginLeft: '20px'
                }}
              />
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};
