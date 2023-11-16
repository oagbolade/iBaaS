import colors from '@/assets/colors';

export const searchgroupContainer = {
  display: 'flex',
  width: '240px',
  padding: '16px 6px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1px',
  borderRadius: '6px',
  background: `${colors.white}`,
  boxShadow:
    '0px 5px 15px 0px rgba(0, 0, 0, 0.08), 0px 15px 35px -5px rgba(17, 24, 38, 0.15), 0px 0px 0px 1px rgba(152, 161, 178, 0.10)',
};

export const checkboxSearchgroupContainer = {
  display: 'flex',
  width: '407px',
  height: '401px',
  padding: '16px 6px',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1px',
  borderRadius: '6px',
  background: `${colors.white}`,
  boxShadow:
    '0px 5px 15px 0px rgba(0, 0, 0, 0.08), 0px 15px 35px -5px rgba(17, 24, 38, 0.15), 0px 0px 0px 1px rgba(152, 161, 178, 0.10)',
};

export const menuTypography = {
  color: `${colors.neutral800}`,
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '20px',
};

export const menuTypographyBackground = {
  width: '100%',
  padding: '4px 10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: `${colors.primaryBlue100}`,
  },
};

export const applyFilterButton = {
  width: '191px',
  height: '40px',
  padding: '16px 48px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  color: `${colors.white}`,
};
