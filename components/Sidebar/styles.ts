import colors from '@/assets/colors';

export const sideBarContainer = {
  width: 278,
  height: '100vh',
  padding: '0 20px',
  backgroundColor: `${colors.lightGrey}`,
  marginTop: '80px',
  '&:hover': {
    boxShadow: 2,
  },
  position: 'sticky',
  top: 80,
  overflow: "scroll",
  overflowX:"hidden",
  scrollbarWidth: "none",

  '&::-webkit-scrollbar':{
    display: "none"
  }
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
  color: `${colors.neutral900}`,
  textTransform: 'none',
  justifyContent: 'left',
};

export const activeSideBar = {
  ...sideBarItem,
  fontWeight: 600,
};

export const mainMenu = {
  backgroundColor: `${colors.lightGrey}`,
  padding: '8px',
  width: '238px',
  height: '40px',
};
