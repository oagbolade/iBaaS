import colors from '@/assets/colors';

export const navbarStyle = {
  display: 'flex',
  width: '100%',
  height: '60px',
  padding: { desktop: '0px 40px', mobile: '0 25px' },
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: `${colors.white}`,
  borderBottom: `1px solid ${colors.neutral300}`,
  zIndex: 2
};

export const systemDetails = {
  width: '100%',
  padding: '10px',
  gap: '24px'
};

export const systemDateCont = {
  fontFamily: 'Averta Regular',
  display: 'flex',
  padding: '8px 16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  borderRadius: '5px',
  border: `1px solid ${colors.neutral300}`,
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
  marginRight: '60px',
  width: '150px',
  height: '40px'
};

export const systemDateTitle = {
  color: '#353F50',
  fontFamily: 'Averta Regular',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px' /* 133.333% */
};

export const greetingStyle = {
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px'
};

export const NavNameStyle = {
  ...greetingStyle,
  color: `${colors.neutral700}`,
  fontSize: '12px',
  lineHeight: '16px'
};

export const navbarCont = {
  display: 'flex',
  alignItems: 'center'
};

export const navbarTitle = {
  width: '40px',
  display: 'flex',
  padding: '8px 9px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '40px',
  fontFamily: 'Averta Regular',
  background: `${colors.activeBlue200}`
};

export const profileTitle = {
  color: `${colors.neutral700}`,
  marginRight: '30px'
};

export const navSettings = {
  display: 'flex',
  width: '100%',
  height: '30px',
  alignItems: 'center',
  color: `${colors.neutral900}`,
  padding: '16px',
  borderRadius: '5px'
};

export const NavTypography = {
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '10px',
  whiteSpace: 'nowrap'
};
export const NavChangePasswordTypography = {
  color: `${colors.neutral900}`,
  fontSize: '10px',
  fontStyle: 'normal',
  fontWeight: 100,
  lineHeight: '10px',
  whiteSpace: 'pre-line',
  letterSpacing: '0.2px'
};
