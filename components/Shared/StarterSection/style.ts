import colors from '@/assets/colors';

export const StackContainer = {
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `${colors.white}`,
  padding: '70px 0',
  marginLeft: '8%',
  width: '303px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const branchTitle = {
  color: `${colors.neutral800}`,
  textAlign: 'center',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '1',
  fontFamily: 'Averta Regular',
  whiteSpace: 'pre-line',
  width: '290px',
  height: '40px',
  top: '20px',
  b: {
    color: `${colors.neutral800}`,
    fontFamily: 'Averta Regular',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600
  }
};

export const branchButtonAdd = {
  width: '201px',
  padding: '16px 78px',
  borderRadius: '8px',
  background: `${colors.activeBlue400}`,
  color: `${colors.white}`
};
