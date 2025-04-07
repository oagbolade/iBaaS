import colors from '@/assets/colors';

export const bannerTitleContainer = {
  margin: '120px 0 30px 0',
  position: 'absolute',
  bottom: '130px',
  padding: '20px 0 20px 120px'
};
export const bannerContainer = {
  display: 'flex',
  width: '488px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '48px',
  marginTop: '340px'
};
export const bannerTitle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  alignSelf: 'stretch'
};
export const platformTitle = {
  color: `${colors.neutral900}`,
  fontSize: '40px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '48px' /* 120% */,
  whiteSpace: 'pre-line',
  alignSelf: 'stretch'
};
export const bankTitle = {
  color: `${colors.neutral700}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px' /* 150% */,
  whiteSpace: 'pre-line',
  alignSelf: 'stretch'
};
export const loginContainer = {
  display: 'flex',
  width: '690px',
  height: '72px',
  padding: '20px 58px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '8px',
  flexShrink: 0,
  marginTop: '60px'
};
export const loginFormStyle = {
  display: 'flex',
  padding: { desktop: '10px 90px 0 90px', mobile: '50px 50px 0 50px' },
  width: { desktop: '45vw', mobile: '100vw' },
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '32px',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.white}`,
  marginTop: '25px',
  height: '770px'
};
export const bannerMainTitle = {
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36px',
  color: `${colors.white}`,
  width: '434px',
  marginBottom: '12px'
};
export const loginIbaas = {
  color: `${colors.primaryBlue}`,
  textAlign: '40px',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '10px',
  letterSpacing: '0.088px'
};

export const resetPasswordModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px 8px 0px 0px',
  width: 583,
  bgcolor: 'background.paper',
  border: `1px solid ${colors.neutral200}`,
  boxShadow: 24,
  padding: '50px 20px'
};

export const resetPasswordModalHeading1 = {
  color: `${colors.neutral900}`,
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600
};

export const resetPasswordModalHeading2 = {
  color: `${colors.neutral700}`,
  fontSize: 13,
  fontStyle: 'normal',
  fontWeight: 400
};

export const resetPasswordButton = {
  height: '40px',
  width: '100%',
  fontSize: '16px',
  fontStyle: 'normal',
  borderRadius: '8px',
  fontWeight: 600,
  color: `${colors.white}`
};

export const bannerSubtitle = {
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: `${colors.white}`,
  width: '470px',
  height: '48px',
  whiteSpace: 'normal'
};

export const mainTitle = {
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '40px',
  color: `${colors.neutral900}`,
  marginBottom: '10px'
};

export const subTitle = {
  fontSize: '16px',
  color: `${colors.neutral700}`,
  fontWeight: 400
};

export const loginButton = {
  height: '56px',
  padding: '16px 78px',
  width: '100%',
  fontSize: '16px',
  fontWeight: 600,
  color: `${colors.white}`
};

export const forgotPassword = {
  color: `${colors.activeBlue400}`,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignSelf: 'center',
  width: '127px',
  marginTop: '18px'
};
export const authItem = {
  display: 'flex',
  width: '583px',
  padding: '40px 0px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  borderRadius: '8px 8px 0px 0px',
  border: `1px solid ${colors.neutral200}`,
  background: `${colors.white}`
};
export const inputText = {
  display: 'flex',
  // padding: '16px 0px',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '10px',
  alignSelf: 'stretch'
};
export const textStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '42px',
  alignSelf: 'stretch'
};
export const authContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch'
};
export const authTitle = {
  display: 'flex',
  padding: '0px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  alignSelf: 'stretch'
};

export const titleStyle = {
  color: `${colors.primaryText}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px' /* 150% */
};
export const subtitleStyle = {
  color: `${colors.secondaryText}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px' /* 142.857% */
};
