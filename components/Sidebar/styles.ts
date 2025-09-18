import colors from '@/assets/colors';

export const verticalScroll = {
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

export const companyContainer = {
  padding: '20px 16px',
  gap: '16px',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300} `,
  background: `${colors.neutral100}`,
  zIndex: 1,
  width: '243px',
  minHeight: '124px',
  marginTop: 1,
  marginBottom: 1,
};

export const companyNameTitle = {
  color: `${colors.Gray900}`,
  fontFamily: 'Averta Regular',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px' /* 150% */,
  textWrap: 'wrap',
  width: '211px'
};

export const companyBranchCode = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px'
};

export const companyBranch = {
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px' /* 142.857% */
};

export const companyAddress = {
  overflow: 'hidden',
  color: `${colors.neutral900}`,
  textOverflow: 'ellipsis',
  fontFamily: 'Averta Regular',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px' /* 142.857% */,
  display: '-webkit-box',
  webkitBoxOrient: 'vertical',
  webkitLineClamp: 1,
  alignSelf: 'stretch',
  whiteSpace: 'pre-line'
};

export const sideBarContainer = {
  width: '278px',
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
  height: '35px',
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
  height: '35px'
};

export const comingSoon = {
  marginLeft: 8,
  background: colors.activeBlue100, 
  color: colors.activeBlue400,      
  fontSize: 12,
  borderRadius: 8,
  padding: '2px 8px',
  fontWeight: 500,
  display: 'inline-block',
  verticalAlign: 'middle',
};
