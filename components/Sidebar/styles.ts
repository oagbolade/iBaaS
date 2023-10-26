import colors from '@/assets/colors';

export const sideBarContainer = {
  width: 278,
  height: '100vh',
  padding: '0 20px',
  backgroundColor: `${colors.white}`,
  border: `1px solid ${colors.neutral300}`,
  borderTop: 'none',
  marginTop: '60px',
  overflow: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  top: { mobile: 0, desktop: 50 },
  position: 'sticky',
  zIndex: 9,
};

export const sideBarItem = {
  fontFamily: 'Averta Regular',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  width: '200px',
  height: '40px',
  padding: '8px',
  borderRadius: '8px',
  color: `${colors.neutral700}`,
  textTransform: 'none',
  justifyContent: 'left',
};

export const mainMenu = {
  backgroundColor: `${colors.white}`,
  padding: '8px',
  width: '238px',
  height: '40px',
};
