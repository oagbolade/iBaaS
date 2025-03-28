import colors from '@/assets/colors';

export const PortfolioContainer = {
  display: 'flex',
  width: '1165px',
  padding: '10px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0px',
  borderRadius: '0px',
  height: '100px',
  boxShadow: 'none'
};

export const PortfolioCards = {
  display: 'flex',
  padding: '0px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  alignSelf: 'stretch',
  width: '1117px',
  height: '404px'
};

export const PortfolioTableCards = {
  display: 'flex',
  padding: '0px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0px',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.white}`,
  width: '105%',
  height: 'auto'
};
export const PortfolioCardStyle = {
  display: 'flex',
  padding: '20px 24px 19px 16px',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  width: '100%',
  height: 'auto'
};

export const PortfolioHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
};

export const PortfolioTitleHeader = {
  display: 'flex',
  padding: '0px',
  alignItems: 'center',
  gap: '2px',
  flex: '1 0 0',
  borderRadius: '0px'
};
export const PortfolioTableText = {
  display: 'flex',
  width: '1065px',
  padding: '0px',
  flexDirection: 'row',
  gap: '14px',
  borderRadius: '0px',
  height: '44px'
};

export const PortfolioTitle = {
  color: `${colors.neutral900}`,
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */,
  width: '40px'
};

export const PortfolioAccountContainer = {
  display: 'flex',
  padding: '0px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4px',
  flex: '1 0 0',
  borderRadius: '0px',
  width: '100%',
  height: 'auto'
};
export const PortfolioProduct = {
  color: `${colors.neutral700}`,
  textAlign: 'right',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px' /* 133.333% */,
  alignSelf: 'stretch'
};
export const PortfolioProductTilte = {
  color: `${colors.neutral700}`,
  textAlign: 'right',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  alignSelf: 'stretch'
};

export const buttonBackgroundColor = {
  backgroundColor: `${colors.activeBlue400}`,
  color: `${colors.white}`
};
