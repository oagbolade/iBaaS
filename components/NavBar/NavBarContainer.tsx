import React, { useContext, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import { Profile } from './Profile';
import { navbarStyle } from './styles';
import { NavBarContext } from '@/app/NavBarContext';
import colors from '@/assets/colors';
import { useGetCompanyByCode } from '@/api/setup/useCreateCompany';
import { useGetBankLogo } from '@/api/general/useBankLogo';
import Link from 'next/link';
import {
  getBankLogoFromLocalStorage,
  saveBankLogoToLocalStorage
} from '@/utils/user-storage';

type Props = {
  toggleMenu: () => void;
};

export const NavBarContainer = ({ toggleMenu }: Props) => {
  const { pageTitle } = useContext(NavBarContext);
  const { bank } = useGetCompanyByCode();
  const { logo } = useGetBankLogo();

  const storedLogo = getBankLogoFromLocalStorage();

  useEffect(() => {
    if (logo && !storedLogo) {
      saveBankLogoToLocalStorage(`data:image/png;image/jpg;base64,${logo}`);
    }
  }, [logo, storedLogo]);

  const BankLogo = logo?.toString()
    ? `data:image/png;image/jpg;base64,${logo}`
    : storedLogo || null;

  return (
    <Box sx={navbarStyle}>
      <Box sx={{ width: '237px', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleMenu}>
          <MenuIcon sx={{ display: { desktop: 'none' }, marginTop: '6px' }} />
        </IconButton>

        <Link href="/dashboard">
          {BankLogo ? (
            <img
              src={BankLogo}
              alt={bank?.bankName || 'Bank Logo'}
              className="max-w-[160px] h-auto ml-2 object-contain"
            />
          ) : (
            <Typography sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
              {bank?.bankName}
            </Typography>
          )}
        </Link>
      </Box>

      <Stack
        alignItems="center"
        direction="row"
        justifyContent={{ mobile: 'flex-end', desktop: 'space-between' }}
        spacing={3}
        sx={{
          padding: '12px 25px',
          width: '85%',
        }}
      >
        <Box ml={{ mobile: 2.5, desktop: 0 }}>
          <Typography
            sx={{
              color: `${colors.neutral900}`,
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '32px',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            left: '65px',
            display: { mobile: 'none', desktop: 'block' },
          }}
        >
          <Profile />
        </Box>
      </Stack>
    </Box>
  );
};
