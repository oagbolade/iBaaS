import colors from '@/assets/colors';

export const wizardBoxStyle = {
  backgroundColor: `${colors.navBarTitleColor}`,
  height: '100vh',
  padding: '48px 16px 0px 48px'
};

export const footerTextBox = {
  color: `${colors.primaryBlue100}`,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  marginBottom: 2,
  fontSize: 14,
  fontWeight: 400
};

export const stepOneProceedButton = {
  height: '56px',
  padding: '16px 78px',
  marginBottom: '10px',
  width: '100%',
  fontSize: '16px',
  fontWeight: 600,
  color: `${colors.white}`
};

export const stepTwoProceedButton = {
  ...stepOneProceedButton,
  marginTop: '20px'
};

export const fileUpload = {
  height: '132px',
  padding: '24px 12px',
  marginBottom: '10px',
  width: '528px',
  backgroundColor: `${colors.neutral200}`,
  border: `1px dashed ${colors.neutral300}`,
  alignItems: 'center',
  borderWidth: 1,
  outlineOfset: 105,
  '&:hover': {
    backgroundColor: 'unset'
  },
  display: 'flex',
  flexDirection: 'column'
};

export const signUpDoumentUploadHeadingText = {
  fontSize: 14,
  fontWeight: 400,
  color: `${colors.neutral900}`
};

export const signUpDocumeentUploadSubheadingText = {
  fontSize: 12,
  fontWeight: 400,
  color: `${colors.neutral600}`
};

export const uploadlabel = {
  fontSize: 12,
  fontWeight: 600,
  color: `${colors.neutral900}`,
  marginTop: 5
};

export const signupSideFooterText = {
  fontSize: 14,
  fontWeight: 400
};

export const wizardheadingtext = {
  color: `${colors.primaryBlue100}`,
  fontSize: 16,
  fontWeight: 600
};

export const wizardSubheadingtext = {
  color: `${colors.primaryBlue200}`,
  fontSize: 14,
  fontWeight: 400
};

export const container = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  marginTop: 5
};

export const textContainer = {
  display: 'flex',
  flexDirection: 'column'
};

export const textBox1 = {
  marginTop: 2.5
};

export const mainContainer = {
  display: 'flex',
  flexDirection: 'column'
};

export const form1heading = {
  marginBottom: '10px',
  marginTop: '30px',
  color: `${colors.neutral900}`,
  fontSize: 32,
  fontWeight: 700
};

export const form1paragraph = {
  marginBottom: '30px',
  color: `${colors.neutral900}`,
  fontSize: 14,
  fontWeight: 400
};

export const fileDetailsContainer = {
  width: '528px',
  height: '63px',
  border: `1px solid ${colors.neutral300}`,
  padding: '24px 12px',
  justifyContent: 'space-between',
  display: 'flex',
  borderRadius: '8px',
  alignItems: 'center',
  marginBottom: '30px',
  color: `${colors.neutral900}`,
  fontSize: 14,
  fontWeight: 600
};

export const fileName = {
  color: `${colors.neutral800}`,
  fontSize: 14,
  fontWeight: 600
};

export const fileSize = {
  color: `${colors.neutral700}`,
  fontSize: 14,
  fontWeight: 400
};

export const removeButton = {
  color: `${colors.primaryRedBase}`,
  fontSize: 14,
  fontWeight: 600
};

export const removeAndSizeContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: 3
};

export const backButtonContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
  gap: 1
};

export const backButtonText = {
  color: `${colors.neutral900}`,
  fontSize: 16,
  fontWeight: 600
};

export const backButtonIcon = {
  color: `${colors.neutral900}`,
  fontSize: 20,
  fontWeight: 600
};
