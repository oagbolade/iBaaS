import colors from '@/assets/colors';

export const PasswordBody = {
  display: 'inline-flex',
  padding: '32px 0px 572px 40px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '72px',
  background: `${colors.white}`,
  color: `${colors.activeBlue400}`,
};

export const PasswordTitleHeader = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '581px',
  color: `${colors.neutral900}`,
  marginTop: "65px"
};
export const PasswordTitle ={
  fontSize: '28px', 
  fontWeight: 700,
   color:`${colors.neutral900}`,
   lineHeight: '36px',
   fontStyle: 'normal'
}


export const PasswordChangeBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '80px',
  color: `${colors.activeBlue400}`,
};


export const ResetButtonPassword ={
   color: `${colors.neutral700}`,
   background: `${colors.white}`,
  display: 'flex',
  height: '48px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  padding: "16px 24px",
  borderRadius: '8px',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
}