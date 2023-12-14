'use client';
import { Box, Button } from '@mui/material';
import React from 'react';
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
  viewDetails,
} from './style';
import colors from '@/assets/colors';

type Props = {
  title: string;
  description: string;
  link?: string;
};

export const CustomCardsReports = ({
  title,
  description,
  link = '',
}: Props) => {
  return (
    <Box sx={{ marginLeft: '16px' }}>
      <Box>
        <Box>
          <Card sx={detailsCards}>
            <CardContent sx={detailsTitleContainer}>
              <Box>
                <Typography sx={detailsTitle}>{title}</Typography>
              </Box>
              <Box>
                <Typography sx={detailsDescription}>{description}</Typography>
              </Box>
              <CardActions sx={detailCardsArrow}>
                <Box>
                  <Link href={link} style={viewDetails}>
                    View Details
                  </Link>
                  <ArrowForwardOutlinedIcon
                    sx={{
                      color: `${colors.primaryBlue500}`,
                      marginLeft: '20px',
                    }}
                  />
                </Box>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
