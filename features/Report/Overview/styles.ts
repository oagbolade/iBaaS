import colors from '@/assets/colors';

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
  fontSize: '15px',
  fontWeight: 600
};

export const dateFilter = {
  ...exportData,
  width: { mobile: '290px', desktop: '260px' }
};
