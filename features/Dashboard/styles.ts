import colors from '@/assets/colors';
import { hideScrollbar } from '@/utils/scrollBars';

export const tableCard = {
  padding: '24px',
  borderRadius: '12px',
  border: `1px solid  ${colors.neutral300}`,
  background: `${colors.white}`,
  minHeight: '313px',
};

export const recetntModulesCard = {
    width: '40%',
    maxHeight: '302px',
    padding: '24px',
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    ...hideScrollbar,
};

export const recetntModulesTypography = {
    color: `${colors.neutral900}`,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
};
