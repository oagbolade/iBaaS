import colors from '@/assets/colors';
import { modalScrollbar } from '@/utils/scrollBars';

export const ModalTitle = {
  color: `${colors.neutral900}`,
  fontSize: { mobile: '18px', tablet: '28px' },
  fontWeight: 700,
  lineHeight: '32px',
};

export const ModalContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { mobile: '100%', tablet: '724px' },
  maxWidth: '90vw',
  minHeight: '292px',
  maxHeight: '90vh',
  boxShadow: 24,
  borderRadius: '8px',
  background: `${colors.white}`,
  display: 'inline-flex',
  paddingTop: '0px',
  flexDirection: 'column',
  alignItems: 'center',
  ...modalScrollbar,
};

export const ModalHeader = {
  display: 'flex',
  width: { mobile: '100%', tablet: '724px' },
  maxWidth: '90vw',
  height: '80px',
  padding: '24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '8px',
};

export const ModalBackButton = {
  height: { desktop: '48px', mobile: '28px' },
  width: { desktop: '86px', mobile: '76px' },
  fontSize: { desktop: '18px', mobile: '12px' },
  fontWeight: 600,
  color: `${colors.neutral900}`,
  backgroundColor: `${colors.white}`,
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
};

export const ModalSaveButton = {
  height: { desktop: '48px', mobile: '40px', tablet: '40px' },
  width: { desktop: '185px', mobile: '85px', tablet: '85px' },
  fontSize: { desktop: '12px', mobile: '10px', tablet: '10px' },
  fontWeight: 600,
  color: `${colors.white}`,
  backgroundColor: `${colors.activeBlue400}`,
  borderRadius: '8px',
  marginRight: { desktop: '45px' },
  alignItems: 'center',
  textAlign: 'center',
};

export const ResetButton = {
  height: { desktop: '42px', mobile: '28px' },
  width: { desktop: '42px', mobile: '28px' },
  fontSize: { desktop: '20px', mobile: '12px' },
  fontWeight: 600,
  color: `${colors.neutral700}`,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'center',
  margin: '0 auto',
  marginRight: { desktop: '45px' },
};
