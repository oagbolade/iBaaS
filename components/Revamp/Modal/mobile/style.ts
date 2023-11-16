import colors from '@/assets/colors';

export const modalContainer = {
    display: 'inline-flex',
    paddingBottom: '0px',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '12px',
    left: '50%',
    transform: 'translate(-80%, -80%)',
    width: '492px',
    maxHeight: '680px',
    minHeight: '300px',
    position: 'absolute' as 'absolute',
    justifyContent: 'center',
    top: '35%',
    background: `${colors.white}`,
    boxShadow:
      '0px 10px 30px 0px rgba(0, 0, 0, 0.20), 0px 30px 70px 0px rgba(26, 34, 64, 0.15), 0px 0px 0px 1px rgba(136, 143, 170, 0.10)',
  };