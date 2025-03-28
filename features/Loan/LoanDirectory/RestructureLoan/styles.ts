import colors from '@/assets/colors';

const common = {
  width: '106px',
  height: { mobile: '30px', desktop: '40px' },
  padding: { mobile: '8px 54px', desktop: '16px 78px' },
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px'
};

export const submitButton = {
  ...common,
  width: { mobile: '60px', desktop: '136px' },
  color: 'white',
  fontSize: { mobile: '10px', desktop: '14px' },
  marginRight: 2
};

export const cancelButton = {
  ...common,
  width: { mobile: '80px', desktop: '106px' },
  marginRight: '10px',
  fontSize: { mobile: '10px', desktop: '14px' },
  backgroundColor: `${colors.white}`
};

export const CashDepositForwardToApprovingOfficerButtonStyle = {
  ...common,
  width: { mobile: '80px', desktop: '100%' },
  marginRight: '10px',
  fontSize: { mobile: '10px', desktop: '14px' },
  backgroundColor: `${colors.white}`,
  border: `1px solid ${colors.activeBlue400}`
};
