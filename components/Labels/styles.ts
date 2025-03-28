import colors from '@/assets/colors';

export const labelTypography = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  padding: '4px 8px',
  maxWidth: '100px',
  minHeight: '28px',
  borderRadius: '8px'
};

export const nipBeneficiaryLabelTypography = {
  ...labelTypography,
  fontWeight: 700,
  fontSize: '16px',
  color: `${colors.neutral900}`
};
