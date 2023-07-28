import colors from '@/assets/colors';

export const ModalTitle = {
  color: `${colors.neutral900}`,
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '32px',
};

export const ModalContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '724px',
  height: '820px',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  background: `${colors.white}`,
  display: 'inline-flex',
  paddingTop: '0px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
};

export const ModalHeader = {
  backgroundColor: `${colors.neutral200}`,
  display: 'flex',
  width: '724px',
  padding: '24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '8px',
};


