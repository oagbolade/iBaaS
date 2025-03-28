import colors from '@/assets/colors';

export const bannerTitleContainer = {
  margin: '120px 0 30px 0',
  position: 'absolute',
  bottom: '130px',
  padding: '20px 0 20px 120px'
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
