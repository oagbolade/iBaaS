import colors from '@/assets/colors';

export const navbarStyle = {
  display: 'flex',
  width: '100%',
  height: '60px',
  padding: { desktop: '0px 40px', mobile: '0 25px' },
  alignItems: 'center',
  // justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: `${colors.white}`,
  borderBottom: `1px solid ${colors.neutral300}`,
};

export const greetingStyle = {
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
};

export const NavNameStyle = {
  ...greetingStyle,
  color: `${colors.neutral700}`,
  fontSize: '12px',
  lineHeight: '16px',
};

export const navbarCont = {
  display: 'flex',
  alignItems: 'center',
  gap: '-10px',
  marginRight: '-38px',
};

export const navbarTitle = {
  width: '40px',
  display: 'flex',
  padding: '8px 9px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '40px',
  fontFamily: 'Averta Regular',
  background: `${colors.activeBlue200}`,
};

export const navSettings = {
  display: 'flex',
  width: '136px',
  height: '48px',
  alignItems: 'center',
  color: `${colors.neutral900}`,
};

export const NavTypography = {
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
};
