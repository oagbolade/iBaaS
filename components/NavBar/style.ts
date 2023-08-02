import colors from '@/assets/colors';

export const navbarStyle = {
  display: 'flex',
  width: '100%',
  height: '80px',
  padding: '0px 40px',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: `${colors.navBarColor}`,
};

export const navbarCont = {
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    gap: '8px',
    marginRight: '-30px',
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
