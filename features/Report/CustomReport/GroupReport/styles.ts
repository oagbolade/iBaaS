import colors from '@/assets/colors';

export const miniCardContainer = {
  padding: '32px 20px',
  marginTop: '20px',
  marginBottom: '0',
  minWidth: '310px',
  height: '72px',
  borderRadius: '4px',
  border: `1px solid ${colors.neutral300}`
};

export const OfficePerformanceContainer = {
  padding: '20px 16px',
  marginTop: '35px',
  width: '100%',
  height: '633px',
  borderRadius: '4px',
  border: `1px solid ${colors.neutral300}`
};

export const OfficePerformanceName = {
  ...OfficePerformanceContainer,
  padding: '16px 24px',
  margin: '0',
  width: '100%',
  height: '98px'
};

export const OfficerTrendSection = {
  ...OfficePerformanceContainer,
  padding: '24px',
  margin: '0px',
  width: '95%',
  height: '144px',
  marginBottom: '14.6px'
};

export const OfficerGraphSection = {
  ...OfficePerformanceContainer,
  padding: '24px',
  width: '90%',
  height: '464px',
  margin: '0px'
};

export const OfficeAmountTypography = {
  color: `${colors.neutral900}`,
  fontSize: '40px',
  fontWeight: 400,
  lineHeight: '48px',
  width: '289px'
};

export const OfficeTrendNumberTypography = {
  color: `${colors.activeGreen300}`,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px'
};
