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

export const PasswordChangeBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '80px',
  color: `${colors.activeBlue400}`,
};


export const ResetButtonPassword ={
  display: "flex",
  height: "42px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: 'center',
  marginRight: '70px',
  color: `${colors.neutral700}`,
  margin: '0 auto',
  width: '42px',
  fontSize: '20px',
  fontWeight: 600,
  background: `${colors.white}`
}