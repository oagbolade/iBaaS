import colors from '@/assets/colors';

export const detailsCards = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  borderRadius: '6px',
  width: '350px',
  height: '260px',
  border: `1px solid ${colors.neutral300}`,
  boxShadow: 'none'
};

export const detailsTitleContainer = {
  display: 'flex',
  padding: '32px 32px',
  alignItems: 'center',
  gap: '24px',
  borderRadius: '10px',
  color: `${colors.neutral900}`,
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: 'auto'
};

export const detailsTitle = {
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px',
  width: '210px',
  height: '32px',
  marginRight: '130px',
  padding: '10px 24px'
};
export const detailsDescription = {
  color: `${colors.neutral900}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
  whiteSpace: 'pre-line',
  width: '294px',
  height: '60px'
};
export const detailCardsArrow = {
  display: 'flex',
  width: '174px',
  height: '40px',
  justifyContent: 'center',
  alignItems: 'center',
  color: `${colors.primaryBlue100}`,
  marginRight: '120px',
  border: `1px solid ${colors.primaryBlue100}`,
  borderRadius: '10px',
  padding: '16px 16px',
  backgroundColor: `${colors.primaryBlue100}`
};

export const viewDetails = {
  color: `${colors.primaryBlue500}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  flex: '1 0 0',
  width: '138px'
};

export const shortCardsContainer = {
  display: 'inline-flex',
  padding: '0 0 0px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0px',
  borderRadius: '6px',
  height: '544px',
  width: { mobile: '100%', desktop: '1165px' }
};

export const shortCard = {
  display: 'flex',
  width: { mobile: '100%', desktop: '100%' },
  padding: '10px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0px',
  borderRadius: '0px',
  height: '100px',
  boxShadow: 'none'
};

export const shortcards = {
  display: 'flex',
  padding: '10px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '15px',
  alignSelf: 'stretch',
  borderRadius: '0px',
  width: { mobile: '100%', desktop: '100%' },
  height: '356px'
};

export const shortscard = {
  display: 'flex',
  padding: '0 0 0px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0px',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.white}`,
  width: { mobile: '764px', desktop: '100%' },
  height: '71px'
};

export const shortCardStyle = {
  display: 'flex',
  padding: '20px 24px 19px 16px',
  alignItems: 'center',
  gap: '0px',
  alignSelf: 'stretch',
  borderRadius: '6px',
  height: '71px'
};

export const shortCardtitle = {
  display: 'flex',
  padding: '0 0 0px',
  alignItems: 'flex-start',
  gap: '10px',
  flex: '1 0 0',
  borderRadius: '5px',
  height: '32px'
};

export const shortCardText = {
  display: 'flex',
  padding: '0 0 0px',
  alignItems: 'center',
  gap: '0px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  width: { mobile: '100%', desktop: '969px' },
  height: '32px'
};
export const shortTitle = {
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */,
  width: '70px'
};

export const shortCardTitle = {
  color: `${colors.neutral700}`,
  textAlign: 'right',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px' /* 150% */,
  marginLeft: '10%',
  width: '70px'
};

export const totalContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '58px',
  flexShrink: '0',
  borderRadius: '0px',
  backgroundColor: `${colors.primaryBlue500}`,
  padding: '15px'
};

export const totalTitle = {
  color: `${colors.primaryBlue100}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px' /* 150% */,
  top: '50px'
};
