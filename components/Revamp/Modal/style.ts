import colors from '@/assets/colors';

export const ModalStyleContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '486px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  boxShadow: 24,
  borderRadius: '12px',
  background: `${colors.white}`,
  display: 'inline-flex',
  paddingTop: '0px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
  zIndex: '2'
};

export const RejectedModal = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  width: '486px',
  height: '281px',
  color: `${colors.neutral700}`
};

export const ModalTitle = {
  display: 'flex',
  padding: '16px 24px 12px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
  color: `${colors.neutral900}`,
  width: '486px',
  height: '60px',
  borderBottom: `1px solid ${colors.neutral300}`
};

export const textTitle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch'
};

export const textTypography = {
  flex: '1 0 0',
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '32px',
  width: '200px',
  height: '23px'
};

export const modalTable = {
  display: 'flex',
  height: '4px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  alignSelf: 'stretch',
  width: '486px',
  marginTop: '20px'
};

export const modalText = {
  display: 'flex',
  height: '153px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  flexShrink: 0,
  alignSelf: 'stretch',
  width: '300px',
  color: `${colors.neutral900}`
};

export const pageText = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  alignSelf: 'stretch',
  height: '20px',
  width: '40px',
  color: `${colors.neutral700}`,
  marginRight: '170px'
};

export const TypographyText = {
  alignSelf: 'stretch',
  color: `${colors.neutral700}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px'
};

export const RejectedLoadButtonContainer = {
  width: '486px',
  height: '80px',
  flexShrink: 0,
  color: `${colors.neutral300}`,
  marginBottom: '10px',
  marginRight: '50px',
  marginTop: '30px'
};

export const RejectedLoanStyle = {
  width: '486px',
  flex: '1 0 0',
  borderRadius: '0px 0px 12px 12px',
  border: `1px solid ${colors.neutral300} `,
  background: `${colors.neutral200}`,
  height: '82px',
  marginRight: '60px'
};

export const RejectedButton = {
  display: 'inline-flex',
  height: '45.556px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '12px',
  flexShrink: 0,
  width: '273px',
  color: `${colors.neutral900}`,
  marginLeft: '180px'
};

export const TextAreaContainer = {
  display: 'flex',
  height: '138px',
  padding: '0px 21px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  flexShrink: 0,
  alignSelf: 'stretch',
  width: '474px',
  color: `${colors.neutral900}`
};

export const TextArea = {
  width: '400px'
};

export const ButtonContainer = {
  width: { mobile: '289px', desktop: '486px' },
  height: '82px',
  flexShrink: 0,
  color: `${colors.neutral300}`
};

export const ButtonColorStyle = {
  width: { mobile: '288px', desktop: '486px' },
  flex: '1 0 0',
  borderRadius: '0px 0px 12px 12px',
  border: `1px solid ${colors.neutral300} `,
  background: `${colors.neutral200}`,
  height: '82px',
  marginTop: '30px'
};

export const ButtonText = {
  display: 'inline-flex',
  height: '45.556px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '12px',
  flexShrink: 0,
  width: { desktop: '273px' },
  color: `${colors.neutral900}`,
  marginLeft: { desktop: '200px' }
};

export const CancelButton = {
  display: 'flex',
  width: '130px',
  height: '40px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '6px',
  backgroundColor: `${colors.white}`,
  color: `${colors.white}`,
  marginTop: '50px'
};
export const TypographyButton = {
  color: `${colors.neutral900}`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px' /* 150% */,
  backgroundColor: `${colors.white}`
};

export const ConfirmButton = {
  display: 'flex',
  width: { mobile: '80px', desktop: '131px' },
  height: '40px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '6px',
  marginTop: '50px',
  background: `${colors.activeBlue400}`
};

export const TypographyConfirm = {
  color: `${colors.white}`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  fontStyle: 'normal'
};

export const DeleteContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '36px',
  flex: '1 0 0',
  width: '486px',
  height: '254px'
};
export const DeleteTitleContainer = {
  display: 'flex',
  padding: '16px 24px 12px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
  borderBottom: `1px solid ${colors.neutral300}`,
  width: '438px',
  height: '60px'
};

export const DeleteTypograph = {
  flex: '1 0 0',
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '32px',
  marginRight: '90px'
};
export const DeleteTitle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  color: `${colors.neutral900}`,
  width: '438px',
  height: '32px'
};

export const DeleteIcon = {
  display: 'flex',
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center'
};

export const DeleteModalContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '46px',
  alignSelf: 'stretch',
  width: '486px',
  height: '158px'
};

export const DeleteModal = {
  display: 'flex',
  height: '40px',
  padding: '0px 21px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  alignSelf: 'stretch',
  width: '486px',
  color: `${colors.neutral700}`
};

export const DeleteTypographTitle = {
  alignSelf: 'stretch',
  color: `${colors.neutral700}`,
  fontSize: '14px',
  fontWeight: 400,
  whiteSpace: 'pre-line',
  lineHeight: '20px' /* 142.857% */
};

export const AccountPasswordContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '36px',
  padding: '2px',
  overflow: 'scroll',
  maxWidth: '486px',
  maxHeight: '700px',
  scrollbarWidth: 'none',
  scrollbarColor: `${colors.neutral900} ${colors.neutral100}`,
  '&::-webkit-scrollbar': {
    width: '8px',
    display: 'none'
  },
  '&::-webkit-scrollbar-track': {
    background: `${colors.neutral100}`,
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: `${colors.neutral900}`,
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: `${colors.activeBlue400}`
  }
};
export const AccountPasswordTitleContainer = {
  display: 'flex',
  padding: '16px 24px 12px 24px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
  borderBottom: `1px solid ${colors.neutral300} `,
  color: `${colors.neutral700}`
};
export const AccountPasswordTitle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  alignSelf: 'stretch',
  color: `${colors.neutral900}`
};
export const AccountTitle = {
  flex: '1 0 0',
  color: `${colors.neutral900}`,
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '32px',
  marginRight: '20px'
};

export const AccountPasswordBodyContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '46px',
  flexShrink: 0,
  padding: '0px 24px'
  // alignSelf: 'stretch'
};

export const AccountBody = {
  display: 'flex',
  mineight: '132px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  flexShrink: 0,
  alignSelf: 'stretch'
};

export const AccountBodyPage = {
  alignSelf: 'stretch',
  color: `${colors.neutral700}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  whiteSpace: 'pre-line',
  marginLeft: '20px'
};
export const AccountInputContainer = {
  display: 'flex',
  height: '40px',
  padding: '0px 21px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  flexShrink: 0,
  alignSelf: 'stretch',
  marginTop: '8px'
};

export const AccountInputText = {
  width: '444px'
};

export const ButtonFramContainer = {
  display: 'inline-flex',
  height: '72px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  flexShrink: 0,
  width: '486px',
  color: `${colors.neutral300}`
};

export const ButtonFrame = {
  width: '486px',
  flex: '1 0 0',
  borderRadius: '0px 0px 12px 12px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.neutral200}`,
  marginTop: '80px'
};
export const ButtonTitle = {
  width: '486px',
  flex: '1 0 0',
  borderRadius: '0px 0px 12px 12px',
  border: `1px solid ${colors.neutral300} `,
  background: `${colors.neutral200}`,
  height: '82px',
  marginTop: '85px'
};
