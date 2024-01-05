import colors from '@/assets/colors';

export const modalContainer = {
  display: 'inline-flex',
  paddingBottom: '0px',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '12px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as 'absolute',
  width: { mobile: '300px', desktop: '492px' },
  height: 'auto',
  top: '50%',
  background: `${colors.white}`,
  boxShadow:
    '0px 10px 30px 0px rgba(0, 0, 0, 0.20), 0px 30px 70px 0px rgba(26, 34, 64, 0.15), 0px 0px 0px 1px rgba(136, 143, 170, 0.10)',
};

export const modalTitleContainer = {
  width: { mobile: '300px', desktop: '492px' },
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '36px',
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
  width: { mobile: '300px', desktop: '492px' },
  height: '60px',
};

export const modalTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  width: { mobile: '280px', desktop: '444px' },
  height: '32px',
  color: `${colors.neutral900}`,
};

export const modalTyopgraphy = {
  flex: '1 0 0',
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */,
};

export const modalBodyContainer = {
  display: 'flex',
  padding: '0px 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '46px',
  alignSelf: 'stretch',
  width: '492px',
  height: '720px',
  color: `${colors.neutral900}`,
  top: '40px',
};

export const modalBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  color: `${colors.neutral1000}`,
  width: '444px',
  height: '624px',
  '& fieldset': { border: 'none' },
  padding: '0 0 24px',
};

export const textTypography = {
  display: 'flex',
  width: '444px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  height: '624px',
  '& fieldset': { border: 'none' },
  textDecoration: 'none',
};
export const text = {
  alignSelf: 'stretch',
  color: `${colors.neutral800}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px' /* 142.857% */,
};

export const textField = {
  alignSelf: 'stretch',
  color: `${colors.neutral1000}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
};

export const textSuccess = {
  color: `${colors.activeBlue400}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px' /* 150% */,
};

export const inputFields = {
  width: { mobile: '250px', tablet: '566px' },
};
