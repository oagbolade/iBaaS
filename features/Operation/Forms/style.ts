import colors from '@/assets/colors';

export const BatchTitle = {
  color: `${colors.neutral900}`,
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '36px',
  marginTop: { mobile: '35px', tablet: '0px' },
};
export const title = {
  color: `${colors.neutral900}`,
  fontSize: { tablet: '28px', mobile: '20px' },
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '36px',
  marginTop: '7px',
  marginBottom: '30px',
};
export const downloadDocument = {
  color: `${colors.white}`,
  textAlign: 'right',
  fontSize: { tablet: '14px', mobile: '12px' },
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px',
};
export const documentUpload = {
  display: 'flex',
  padding: '20px 24px 19px 16px',
  alignItems: 'center',
  gap: '10px',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  background: `${colors.white}`,
  width: { tablet: '560px', mobile: '400px' },
};
export const BatchContainer = {
  display: 'flex',
  width: { tablet: '624px', mobile: '500px' },
  padding: '32px 32px 16px 32px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '32px',
  borderLeft: '1px solid rgba(0, 0, 0, 0.00)',
  background: `${colors.white}`,
  heigh: '80px',
  marginTop: '17px',
};

export const PostingContainer = {
  display: 'flex',
  width: { tablet: '541px', mobile: '300px' },
  height: '899px',
  padding: '32px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  flexShrink: 0,
  borderLeft: `1px solid ${colors.neutral300}`,
  background: `${colors.neutral100}`,
  marginTop: '17px',
  marginBottom: { tablet: '0px', mobile: '190px' },
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
export const templateUpload = {
  display: 'flex',
  padding: '8px',
  alignItems: 'flex-start',
  gap: '10px',
  borderRadius: '28px',
  border: `1px solid ${colors.activeBlue400}`,
  width: '32px',
  height: '32px',
};
export const templateCopy = {
  color: `${colors.activeBlue400}`,
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '24px' /* 171.429% */,
  alignSelf: 'stretch',
};
export const templateTitle = {
  color: `${colors.neutral600}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px' /* 133.333% */,
};
export const templateDownload = {
  color: `${colors.neutral900}`,

  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px' /* 133.333% */,
  alignSelf: 'stretch',
  whiteSpace: { mobile: 'pre-line', tablet: 'normal' },
  '& Button': {
    color: `${colors.activeBlue400}`,
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '16px',
    textDecorationLine: 'underline',
    whiteSpace: { mobile: 'pre-line', tablet: 'normal' },
  },
};
export const templateStyle = {
  whiteSpace: { mobile: 'pre-line', tablet: 'normal' },
};
export const templateUploadContainer = {
  display: 'flex',
  padding: '24px 12px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '4px',
  border: `1px dashed ${colors.neutral300}`,
  background: `${colors.neutral200}`,
  width: { tablet: '560px', mobile: '400px' },
  height: '132px',
  boxShadow: 'none',
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
export const inputText = {
  width: '660px',
};
export const textInput = {
  width: '760px',
};
export const previewContentStyle = {
  marginTop: '-1100%',
  marginLeft: '15px',
};
export const cashContentStyle = {
  marginTop: '-1300%',
  marginLeft: '22px',
};

export const WithdrawalContentStyle = {
  marginTop: '-1200%',
  marginLeft: '22px',
};
export const ChequelContentStyle = {
  marginTop: '-1200%',
  marginLeft: '17px',
};

export const chargeContentStyle = {
  marginTop: '-750%',
  marginLeft: '13px',
};
export const clearContentStyle = {
  marginTop: '-950%',
  marginLeft: '23px',
};
export const bulkContentStyle = {
  marginTop: '-850%',
  marginLeft: '32px',
};

export const fundsContentStyle = {
  marginTop: '-1400%',
  marginLeft: '29px',
};
export const totalText = {
  color: `${colors.activeBlue400}`,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '32px' /* 160% */,
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
