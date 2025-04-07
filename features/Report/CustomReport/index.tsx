'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  cardsDetailsContainer,
  centraliseNoDataAvailable,
  customReportContainer
} from './style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';
import { TextInput } from '@/components/FormikFields';
import { reportsData } from '@/constants/Reports/CustomReport';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

export const CustomReports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredReports = reportsData.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box
        sx={{
          marginTop: '10px',
          marginBottom: '30px',
          marginLeft: '20px',
          width: '100%'
        }}
      >
        <TextInput
          customStyle={{ width: '90%' }}
          name="Search"
          placeholder="Search"
          icon={<SearchIcon />}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => (
              <Box key={index} mb={{ mobile: 2, desktop: 0 }}>
                <CustomCardsReports
                  title={report.title}
                  link={report.link}
                  description={report.description}
                />
              </Box>
            ))
          ) : (
            <Box sx={centraliseNoDataAvailable}>
              <Box mb={3} sx={{ width: '200px', height: '200px' }}>
                <NoDataAvailable
                  message="No reports found"
                  width={200}
                  height={200}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
