import colors from '@/assets/colors';

export const textTitle = {
  color: `${colors.neutral900}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px'
};

export const SelectedContainer = {
  display: 'flex',
  padding: '16px 0px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  alignSelf: 'stretch',
  width: '560px',
  height: '340px',
  borderBottom: `1px solid ${colors.neutral300}`
};

export const SelectedText = {
  display: 'flex',
  padding: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  backgroundColor: `${colors.neutral200}`,
  color: `${colors.neutral600}`,
  width: '560px',
  height: '72px',
  '& fieldset': { border: 'none' },
  textDecoration: 'none'
};

export const OptionsStyleContainer = {
  display: 'flex',
  padding: '10px 10px 10px 14px',
  alignItems: 'flex-start',
  gap: '8px',
  flex: '1 0 0',
  borderRadius: '8px',
  width: '520px',
  height: '45px',
  color: `${colors.neutral300}`,
  borderBottom: `1px solid ${colors.neutral300}`,
  '& fieldset': { border: 'none' },
  textDecoration: 'none',
  border: 'none'
};

export const menuItemContainer = {
  display: 'flex',
  padding: '16px 0px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  alignSelf: 'stretch',
  width: '560px',
  height: '340px',
  borderBottom: `1px solid ${colors.neutral300}`
};

export const searchContainer = {
  display: 'flex',
  width: '560px',
  height: '340px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.white}`,
  color: `${colors.neutral900}`,
  boxShadow:
    '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)'
};

export const OptionsItemStyle = {
  width: '560px',
  height: '40px',
  gap: '6px',
  color: `${colors.neutral900}`
};

export const modalTitleContainer = {
  width: '492px',
  height: '648px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '36px'
};

export const modalContainer = {
  display: 'inline-flex',
  paddingBottom: '0px',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '12px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '492px',
  height: '688px',
  position: 'absolute' as 'absolute',
  top: '50%',
  background: `${colors.white}`,
  boxShadow:
    '0px 10px 30px 0px rgba(0, 0, 0, 0.20), 0px 30px 70px 0px rgba(26, 34, 64, 0.15), 0px 0px 0px 1px rgba(136, 143, 170, 0.10)'
};

export const modalTitle = {
  display: 'flex',
  padding: '16px 24px 12px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
  borderBottom: `1px solid ${colors.neutral300}`,
  color: `${colors.neutral900}`,
  width: '492px',
  height: '60px'
};
export const modalTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  width: '444px',
  height: '32px',
  color: `${colors.neutral900}`
};
export const modalTyopgraphy = {
  flex: '1 0 0',
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */
};
export const modalBodyContainer = {
  display: 'flex',
  padding: '0px 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '46px',
  alignSelf: 'stretch',
  width: '560px',
  height: 'px',
  color: `${colors.neutral900}`
};

export const modalBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  color: `${colors.neutral1000}`,
  width: '444px',
  height: '552px',
  '& fieldset': { border: 'none' }
};
export const textTypography = {
  display: 'flex',
  width: '444px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  height: '48px',
  '& fieldset': { border: 'none' },
  textDecoration: 'none'
};

export const text = {
  alignSelf: 'stretch',
  color: `${colors.neutral800}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px' /* 142.857% */
};
export const textField = {
  alignSelf: 'stretch',
  color: `${colors.neutral1000}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px'
};

export const optionsTextStyle = {
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px',
  color: `${colors.neutral900}`
};

export const optionsText = {
  color: `${colors.neutral900}`,
  /* body/medium */
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '20px'
};
