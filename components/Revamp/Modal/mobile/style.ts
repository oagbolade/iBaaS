import colors from '@/assets/colors';
import { hideScrollbar } from '@/utils/scrollBars';

export const modalContainer = {
  zIndex: 4,
  display: 'inline-flex',
  padding: '0 40px',
  borderRadius: '12px',
  left: '8%',
  width: '300px',
  maxHeight: '580px',
  minHeight: '300px',
  position: 'absolute' as 'absolute',
  justifyContent: 'center',
  top: '8%',
  background: `${colors.white}`,
  boxShadow:
    '0px 10px 30px 0px rgba(0, 0, 0, 0.20), 0px 30px 70px 0px rgba(26, 34, 64, 0.15), 0px 0px 0px 1px rgba(136, 143, 170, 0.10)',
  ...hideScrollbar
};
