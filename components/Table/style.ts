import colors from '@/assets/colors';

export const TableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: `1px solid ${colors.gray200}`,
  width: '1117px',
  height: '48px',
};

export const TableFooter = {
  display: 'flex',
  padding: '16px 24px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  width: '1117px',
  height: '48px',
};

export const TableTitle = {
  color: `${colors.primaryBlue700}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px' /* 133.333% */,
  letterSpacing: '0.4px',
  marginTop: '20px'
};

export const TablePaginationStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '23px',
  width: '113px',
  height: '16px',
  marginLeft: '460px',
  marginTop: '25px',
};

export const TablePaginationTitle = {
  color: `${colors.activeBlue400}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px',
};

export const PaginationContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '40px',
  height: '16px',
  color: `${colors.primaryBlue700}`,
};
