import colors from '@/assets/colors';
import { hideScrollbar } from '@/utils/scrollBars';

export const tableCard = {
  padding: '24px',
  borderRadius: '12px',
  border: `1px solid  ${colors.neutral300}`,
  background: `${colors.white}`,
  minHeight: '313px',
  width: '100%'
};

export const basicSetupContainer = {
  ...tableCard
};

export const recetntModulesCard = {
  width: '40%',
  maxHeight: '302px',
  padding: '24px',
  borderRadius: '12px',
  border: `1px solid ${colors.neutral300}`,
  ...hideScrollbar
};

export const recetntModulesTypography = {
  color: `${colors.neutral900}`,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px'
};

export const setupAndPendingContainer = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between'
};

export const setupTextAndPercentage = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px 0'
};

export const settingSubText = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  color: `${colors.neutral700}`
};

export const AddBranchStyle = {
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  color: `${colors.activeBlue400}`,
  textDecoration: 'underline'
};

export const todoSetup = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const mainSetupContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  marginTop: '40px'
};

export const completedPercentageText = {
  ...settingSubText,
  color: `${colors.neutral900}`
};
