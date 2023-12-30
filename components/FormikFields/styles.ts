import colors from '@/assets/colors';

const baseTypography = {
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
};

export const checkboxTypography = {
  color: `${colors.neutral900}`,
  fontSize: '16px',
  lineHeight: { desktop: '24px', mobile: '12px' },
  fontWeight: 400,
  width: '100%',
};

export const buttonStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  width: '230px',
  height: '30px',
  padding: '16px 78px',
  gap: '8px',
  borderRadius: '6px',
  backgroundColor: `${colors.activeBlue400}`,
  color: `${colors.white}`,
};

export const scrollbarStyle = {
  overflow: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
export const textArea = {
  gap: '8px',
  borderRadius: '4px',
  padding: '16px 12px',
  marginTop: '4px',
  background: `${colors.neutral200}`,
  color: `${colors.neutral600}`,
  width: '327px',
  height: '128px',
  '& fieldset': { border: 'none' },
};

export const textAreaIcon = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: '10px',
  flex: '1 0 0',
  width: '20px',
  height: '20px',
  marginTop: '50px',
  marginLeft: '10px',
};

export const textStyle = {
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  gap: '8px',
  color: `${colors.neutral600}`,
  width: { tablet: '327px', mobile: '100%' },
  height: 'auto',
  '& fieldset': { border: 'none' },
};

export const largeMultiSelectField = {
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  gap: '8px',
  padding: '16px 12px',
  width: '682px',
  height: '56px',
  '& fieldset': { border: 'none' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '0',
    padding: '0',
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
};

export const labelTypography = {
  ...baseTypography,
  color: `${colors.neutral900}`,
  fontWeight: 600,
};

export const chipTypography = {
  ...baseTypography,
  '& .MuiChip-deleteIcon': {
    color: `${colors.white}`,
  },
  color: `${colors.white}`,
  backgroundColor: `${colors.neutral900}`,
  fontSize: '12px',
  lineHeight: '16px',
  marginRight: '10px',
};

export const largeChipTypography = {
  ...baseTypography,
  '& .MuiChip-deleteIcon': {
    color: `${colors.neutral900}`,
  },
  color: `${colors.primaryBlue700}`,
  backgroundColor: `${colors.neutral900}`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginRight: '10px',
  padding: '3px 7px',
  gap: '14px',
  borderRadius: '5px',
  background: `${colors.activeBlue100}`,
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
};

export const multiSelect = {
  ...textStyle,
  paddingRight: '8px',
  width: '200px',
  height: '279px',
  overflow: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const asterix = {
  ...baseTypography,
  color: `${colors.primaryRed400}`,
  marginLeft: '2px',
};
