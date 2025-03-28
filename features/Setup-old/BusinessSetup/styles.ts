import colors from '@/assets/colors';

export const primaryTitle = {
  color: '#354052',
  fontSize: { mobile: '16px', desktop: '24px' },
  fontWeight: 400,
  textAlign: 'center',
  margin: { mobile: '0', desktop: '25px' }
};

export const secondaryTitle = {
  color: '#354052',
  fontSize: { mobile: '20px', desktop: '34px' },
  fontWeight: 800,
  textAlign: 'center'
};

export const stepTitle = {
  width: '223px',
  height: '20px',
  fontSize: { mobile: '16px', desktop: '24px' },
  fontWeight: 600,
  color: `${colors.stepTitleBlue}`,
  padding: '40px',
  float: 'right',
  position: { desktop: 'sticky' },
  top: 50
};

export const formContainer = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '40px auto',
  width: '508px'
};
