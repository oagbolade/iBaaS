'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { PageTitle } from '../Typography';
import SideBarDropdown from './SideBarDropdown';
import { sideBarMenu } from './sideBarMenu';
import {
  companyContainer,
  sideBarContainer,
  companyNameTitle,
  companyAddress
} from './styles';
import './App.module.css';
import { Profile } from '@/components/NavBar/Profile';
import colors from '@/assets/colors';
import { useGetCompanyByCode } from '@/api/setup/useCreateCompany';
import { useGetBankLogo } from '@/api/general/useBankLogo';
import { saveBankLogoToLocalStorage } from '@/utils/user-storage';

export const SideBarContainer = () => {
  const pathname: string | null = usePathname();
  const customReportPage = '/report/custom-report';
  const { bank } = useGetCompanyByCode();
  // ON hold
  // const { logo } = useGetBankLogo();
  // const BankLogo = logo?.toString()
  //   ? `data:image/png;image/jpg;base64,${logo}`
  //   : null;

  // saveBankLogoToLocalStorage(BankLogo || '');

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <Box
      sx={{
        ...sideBarContainer,
        height: '95vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          background: '#fff',
          flexShrink: 0,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          alignContent: 'center',
          padding: '0 25px',
          borderBottom: `1px solid ${colors.neutral300}`,
          overflow: 'hidden'
        }}
      >
        <Link
          href="/dashboard"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {BankLogo ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Image
                className="object-contain"
                src={BankLogo}
                alt={bank?.bankName || 'Bank Logo'}
                width={130}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          ) : (
            <PageTitle title={bank?.bankName} />
          )}
        </Link>
      </Box> */}

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: '10px',
          padding: '0 15px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.neutral300} ${colors.neutral100}`,
          '&::-webkit-scrollbar': {
            width: '3px',
            backgroundColor: colors.neutral100
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.neutral300,
            borderRadius: '5px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: colors.neutral100
          }
        }}
      >
        <Box
          sx={{
            display: { mobile: 'block', desktop: 'none' },
            marginBottom: '20px'
          }}
        >
          <Profile />
        </Box>

        <SideBarDropdown
          sideBarMenu={sideBarMenu}
          setIsAccordionOpen={setIsAccordionOpen}
        />
      </Box>

      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 2,
          background: '#fff',
          flexShrink: 0,
          width: '100%',
          marginBottom: 0.5,
          padding: '0 10px'
        }}
      >
        <Box sx={companyContainer}>
          <PageTitle title={bank?.bankName} styles={companyNameTitle} />
          <PageTitle title={bank?.address} styles={{ ...companyAddress }} />
        </Box>
      </Box>
    </Box>
  );
};
