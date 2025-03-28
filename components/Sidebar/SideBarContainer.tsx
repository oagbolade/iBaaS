'use client';
import React from 'react';
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
import { DIGITVANTImageSVG } from '@/assets/interswitch/image';
import { useGetBankLogo } from '@/api/general/useBankLogo';

export const SideBarContainer = () => {
  const pathname: string | null = usePathname();
  const customReportPage = '/report/custom-report';
  const { bank } = useGetCompanyByCode();
  const { logo } = useGetBankLogo();
  const BankLogo = logo?.toString();
  const setHeight = {
    height: `${pathname === customReportPage ? '420vh' : '100vh'}`
  };
  return (
    <>
      <Box
        py={1.5}
        ml={5}
        sx={{
          borderRight: `1px solid ${colors.neutral300}`,
          display: { mobile: 'none', desktop: 'block' },
          top: 0,
          zIndex: 1,
          paddingBottom: '10px'
        }}
      >
        <Link href="/dashboard">
          {BankLogo ? (
            <Image
              src={BankLogo}
              alt={bank?.bankName || 'Bank Logo'}
              width={170} // Required prop: specify width in pixels
              height={50} // Required prop: specify height in pixels (adjust as needed)
            />
          ) : (
            <PageTitle title={bank?.bankName} />
          )}
        </Link>
      </Box>
      <Box
        sx={{
          ...sideBarContainer,
          ...setHeight,
          overflowY: 'hidden',
          position: 'relative'
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

        <SideBarDropdown sideBarMenu={sideBarMenu} />
        <Box sx={companyContainer}>
          <PageTitle title={bank?.bankName} styles={companyNameTitle} />
          <PageTitle title={bank?.address} styles={{ ...companyAddress }} />
        </Box>
      </Box>
    </>
  );
};
