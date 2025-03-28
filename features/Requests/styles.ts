import { BorderBottom } from '@mui/icons-material';
import colors from '@/assets/colors';

export const backButtonContainerStyle = {
  borderBottom: `1px solid ${colors.loanTitleColor}`,
  padding: '0 23px'
};

export const loanHeading = {
  border: `1px solid ${colors.gray900}`,
  width: 'fit-content',
  margin: '20px 0',
  marginLeft: '23px',
  display: 'flex',
  gap: 23,
  alignItems: 'center',
  borderRadius: '5px',
  padding: '19px 23px 28px 23px'
};

export const pendingRequestDeclineButton = {
  borderRadius: '5px',
  border: `1px solid ${colors.neutral300}`,
  color: `${colors.primaryRed400}`,
  padding: '16px 20px',
  backgroundColor: `${colors.white}`,
  width: '97px',
  height: '40px'
};

export const pendingRequestApproveButton = {
  ...pendingRequestDeclineButton,
  border: `1px solid ${colors.activeGreen400}`,
  color: `${colors.activeGreen400}`
};

export const pendingRequestButtonContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

export const pendingRequestBackButtonContainerStyle = {
  ...backButtonContainerStyle,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 23px'
};

export const rejectRequestModalContainer = {
  marginTop: '30px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
  width: 583,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  padding: '20px 0 0 0'
};

export const rejectRequest = {
  fontSize: '20px',
  color: `${colors.neutral900}`,
  fontWeight: '700',
  borderBottom: `1px solid ${colors.neutral300}`,
  padding: '10px 20px',
  marginBottom: '20px'
};

export const reasonText = {
  color: `${colors.neutral700}`,
  fontSize: '14px',
  fontWeight: 400,
  marginBottom: '10px',
  padding: '0 20px'
};

export const reasonForRejection = {
  color: `${colors.neutral900}`,
  fontSize: '12px',
  fontWeight: 600,
  padding: '0 20px'
};

export const cancelButton = {
  height: '40px',
  width: '130px',
  fontSize: '16px',
  fontStyle: 'normal',
  borderRadius: '8px',
  fontWeight: 600,
  color: `${colors.black}`,
  backgroundColor: `${colors.white}`
};

export const confirmButton = {
  ...cancelButton,
  color: `${colors.white}`,
  backgroundColor: `${colors.activeBlue400}`
};

export const buttonContainer = {
  display: 'flex',
  width: '100%',
  justifyContent: 'end',
  gap: 1,
  backgroundColor: `${colors.neutral300}`,
  padding: '25px 10px 25px 0',
  borderTop: `1px solid ${colors.neutral200}`
};
