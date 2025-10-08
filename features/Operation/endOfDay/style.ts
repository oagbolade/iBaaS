import colors from '@/assets/colors';

export const automaticContainer = {
  display: 'flex',
  width: '411px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px'
};

export const runEndofdayStyle = {
  display: 'flex',
  height: '132px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch'
};
export const timeEndofdayStyle = {
  display: 'flex',
  height: '132px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch',
  marginTop: '15px'
};
export const numberOfDays = {
  alignItems: 'flex-start',
  gap: '6px',
  alignSelf: 'stretch',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)'
};
export const endOfdayTitle = {
  color: `${colors.neutral900}`,
  /* header/H8 */
  fontFamily: 'Averta',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px' /* 142.857% */,
  padding: '0px 21px'
};

export const endofDaytitle = {
  color: `${colors.neutral700}`,
  /* body/large */
  fontFamily: 'Averta',
  fontSize: '17px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px' /* 150% */,
  whiteSpace: 'pre-line'
};
