import colors from '@/assets/colors';

export const verticalScroll = {
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const sideBarContainer = {
  width: '278px',
  height: '100vh',
  padding: '0 20px',
  backgroundColor: `${colors.white}`,
  border: `1px solid ${colors.neutral300}`,
  borderTop: 'none',
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
