import colors from '@/assets/colors';

export const BatchTitle = {
  color: `${colors.neutral900}`,
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '36px',
  marginTop: '90px',
  marginLeft: { mobile: '32px', tablet: '68px', desktop: '53px' },
};

export const BatchContainer = {
  width: { desktop: '421px', mobile: '421px', tablet: '421px' },
  height: { desktop: '789px' },
  flexShrink: 0,
  borderRadius: '6px',
  border: `2px solid ${colors.batchColor}`,
  background: `${colors.white}`,
  marginLeft: { desktop: '70px', tablet: '100px', mobile: '40px' },
  marginTop: { desktop: '30px', mobile: '40px' },
  marginRight: '10px',
  justifyContent: 'center',
  color: `${colors.batchColor}`,
  margingBottom: { mobile: '30px', tablet: '0' },
};

export const PostingContainer = {
  width: '521px',
  height: '789px',
  flexShrink: 0,
  borderRadius: '6px',
  border: `2px solid ${colors.batchColor}`,
  background: `${colors.white}`,
  marginRight: '9px',
  marginTop: '30px',
  padding: '9px 10px',
  marginLeft: { tablet: '100px', mobile: '20px', desktop: '0' },
  color: `${colors.batchColor}`,
  margingBottom: { mobile: '3px', tablet: '0' },
};

export const PostingTitle = {
  color: `${colors.black}`,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  width: '96px',
  height: '24px',
  marginRigh: '120px',
};

export const TitleStyle = {
  color: `${colors.neutral900}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px',
};
export const PostingTitleContainer = {
  display: 'flex',
  marginLeft: '30px',
  marginTop: '10px',
  margin: '30px',
};
export const AccountContainer = {
  display: 'flex',
  padding: '10px 15px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '15px',
  color: `${colors.gray500}`,
  width: '128px',
  height: '61px',
};

export const AccountTitle = {
  color: `${colors.black}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px',
  textTransform: 'uppercase',
};
export const AccountPageTitle = {
  color: `${colors.gray500}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
};

export const AccountSourceTitle = {
  color: `${colors.gray500}`,
  textAlign: 'center',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
};

export const AccoutStatusTitle = {
  color: `${colors.gray500}`,
  textAlign: 'center',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
};

export const CustomStyle = {
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  color: `${colors.neutral600}`,
  width: '250px',
  height: '40px',
  marginRight: '4px',
};
export const PersonalIcon = {
  marginBottom: '20px',
  display: 'flex',
  marginTop: '10px',
};

export const CustomStyleInput = {
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  color: `${colors.neutral600}`,
  width: { desktop: '250px', mobile: '320px' },
  height: '40px',
  marginRight: '50px',
};

export const CustomStyleText = {
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  background: `${colors.neutral200}`,
  color: `${colors.neutral600}`,
  height: '50px',
  width: '357px',
};

export const ButtonContainer = {
  width: '100%',
  height: '109px',
  flexShrink: 0,
  background: `${colors.activeBlue100}`,
  color: `${colors.activeBlue100}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margingTop: '40px',
};

export const ButtonApprove = {
  border: `1px solid ${colors.primaryBlue400}`,
  background: `${colors.white}`,
  display: 'flex',
  width: '259px',
  height: '48px',
  padding: '16px 78px',
  borderRadius: '8px',
  color: `${colors.white}`,
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '20px',
};

export const ButtonApproveTitle = {
  width: '223px',
  height: '24px',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  color: `${colors.primaryBlue400}`,
};

export const ButtonResetTitle = {
  display: 'flex',
  width: '150px',
  height: '40px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  borderRadius: '6px',
  background: `${colors.white}`,
  color: `${colors.neutral900}`,
};

export const ButtonReset = {
  display: 'flex',
  width: '201px',
  height: '48px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  background: `${colors.white}`,
  color: `${colors.neutral900}`,
};

export const ButtonDeposit = {
  display: 'flex',
  width: '201px',
  height: '48px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  background: `${colors.activeBlue400}`,
};

export const ButtonPost = {
  display: 'flex',
  width: '150px',
  height: '40px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  borderRadius: '6px',
  background: `${colors.primaryBlue200}`,
  color: `${colors.white}`,
};

export const ButtonBack = {
  display: 'flex',
  width: '150px',
  height: '40px',
  padding: '16px 78px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  borderRadius: '6px',
  border: `1px solid ${colors.primaryBlue400}`,
  background: `${colors.white}`,
  color: `${colors.primaryBlue400}`,
};
