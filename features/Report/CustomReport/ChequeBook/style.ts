import colors from '@/assets/colors';

export const backButtonContainer = {
  display: 'flex',
  width: '100%',
  padding: '12px 20px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  borderRadius: '20px',
  borderBottom: `1px solid ${colors.loanTitleColor}`,
  height: 'auto',
  marginTop: '10px',
};

export const backStyle = {
  display: 'flex',
  padding: '0px',
  alignItems: 'center',
  gap: '16px',
  flex: '1 0 0',
  borderRadius: '12px',
  width: '100%',
  height: 'auto',
};

export const backTitle = {
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */,
};

export const inputFields = {
  width: { mobile: '250px', tablet: '560px' },
};
export const buttonStyle = {
  display: 'flex',
  width: '126px',
  height: '52px',
  padding: '16px 48px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '4px',
  backgroundColor: `${colors.activeBlue400}`,
  color: `${colors.white}`,
  marginTop: '30px',
  marginLeft: '70px',
  marginBottom: '3px',
};
