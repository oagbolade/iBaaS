import colors from '@/assets/colors';

export const customReportContainer = {
  display: 'flex',
  width: '100%',
  padding: '0 0 32px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  borderRadius: '8px',
  marginTop: '50px',
};

export const cardsDetailsContainer = {
  display: 'flex',
  flex: '1 1 0',
  flexWrap: 'wrap',
  marginBottom: '16px',
  alignItems: 'flex-start',
  width: '100%',
  borderRadius: '8px',
  rowGap: '30px',
};

export const inputFields = {
  padding: '16px 12px',
  height: '52px',
  display: 'flex',
  justifyContent: 'center'
};

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
  marginTop: '10px'
};

export const backStyle = {
  display: 'flex',
  padding: '0px',
  alignItems: 'center',
  gap: '16px',
  flex: '1 0 0',
  borderRadius: '12px',
  width: '100%',
  height: 'auto'
};

export const backTitle = {
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */
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
  marginBottom: '3px'
};

export const transactionVolumeStyle = {
  width: '181px',
  height: '31px',
  borderRadius: '4px',
  padding: '8px 16px',
  border: `1px solid ${colors.neutral200}`,
  backgroundColor: `${colors.neutral200}`,
  color: `${colors.Heading}`,
  fontSize: '12px',
  fontWeight: 500
};

export const allBranchesStyle = {
  ...transactionVolumeStyle,
  width: '139px'
};

export const topFilterStyle = {
  ...transactionVolumeStyle,
  borderRadius: '8px',
  border: `1px solid ${colors.gray300}`,
  backgroundColor: `${colors.white}`,
  width: '320px',
  height: '44px',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  display: 'flex',
  justifyContent: 'space-between'
};

export const exportData = {
  ...transactionVolumeStyle,
  width: { mobile: '290px', desktop: '171px' },
  height: '48px',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  backgroundColor: `${colors.white}`,
  fontSize: '16px',
  fontWeight: 600
};

export const dateFilter = {
  ...exportData,
  width: { mobile: '290px', desktop: '197px' }
};

export const centraliseNoDataAvailable = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh'
};
