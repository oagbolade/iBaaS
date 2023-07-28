import colors from '@/assets/colors';

const baseTypography = {
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
}

export const textStyle = {
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  gap: '8px',
  color: `${colors.neutral600}`,
  width: '327px',
  height: '56px',
  '& fieldset': { border: 'none' },
};

export const labelTypography = {
  ...baseTypography,
  color: `${colors.neutral900}`,
  fontWeight: 600,
};

export const asterix = {
  ...baseTypography,
  color: `${colors.primaryRed400}`,
  marginLeft: '2px',
};
