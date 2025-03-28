import colors from '@/assets/colors';

export const subTitleStyles = {
  color: `${colors.neutral700}`,
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
  textTransform: 'uppercase'
} as const;

export const detailStyle = {
  color: `${colors.neutral900}`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginBottom: '24px',
  textWrap: 'wrap'
} as const;
