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
  minHeight: '612px',
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

export const ModalBackButton = {
  height: '48px',                      
  width: '86px',
  fontSize: '18px',
  fontWeight: 600,
  color: `${colors.neutral900}`,
  backgroundColor: `${colors.white}`,
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`
}

export const ModalSaveButton = {
  height: '48px',                      
  width: '155px',
  fontSize: '19px',
  fontWeight: 600,
  color: `${colors.white}`,
  backgroundColor: `${colors.activeBlue400}`,
  borderRadius: '8px',
}

export const ResetButton = {
  height: '42px',                      
  width: '42px',
  fontSize: '20px',
  fontWeight: 600,
  color: `${colors.neutral700}`,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginRight: '20px',
}


