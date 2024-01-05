import colors from '@/assets/colors';

export const Toasts = {
  display: 'flex',
  width: { mobile: '100%', desktop: '600px' },
  height: '93px',
  alignItems: { mobile: 'center', tablet: 'flex-start' },
  gap: '8px',
  justifyContent: 'center',
  alignSelf: 'stretch',
  borderRadius: '6px',
  border: `1px solid ${colors.activeGreen200}`,
  backgroundColor: `${colors.activeGreen100}`,
  boxShadow:
    '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
  position: 'absolute',
  zIndex: 2,
  top: '50px',
  left: { mobile: '2%', desktop: '30%' },
};

export const ToastContainers = {
  width: '6px',
  flexShrink: 0,
  alignSelf: 'stretch',
  backgroundColor: `${colors.activeGreen400}`,
  borderRadius: '7px',
};

export const ToastTitleContainer = {
  color: `${colors.activeGreen600}`,
  display: 'flex',
  padding: '12px 8px 13px 8px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  width: { mobile: '100%', desktop: '586px' },
  height: 'auto',
};

export const ToastStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch',
  width: { mobile: '100%', desktop: '586px' },
  height: '24px',
};

export const ToastText = {
  color: `${colors.activeGreen600}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  width: { mobile: '100%', desktop: '586px' },
  whiteSpace: 'wrap',
};

export const textFieldStyle = {
  color: `${colors.activeGreen600}`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
};
