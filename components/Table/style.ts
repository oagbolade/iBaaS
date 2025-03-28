import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import colors from '@/assets/colors';

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'isHeader'
})(() => {
  return {
    color: `${colors.neutral900}`,
    fontFamily: 'Averta Regular',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    padding: '20px 20px',

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: `${colors.neutral200}`,
      color: `${colors.neutral900}`,
      fontWeight: 600,
      textAlign: 'left'
    },

    [`&.${tableCellClasses.body}`]: {
      fontWeight: 400,
      textAlign: 'left'
    }
  };
});

export const TableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: `1px solid ${colors.gray200}`,
  width: '1117px',
  height: '48px'
};

export const TableTitle = {
  color: `${colors.primaryBlue700}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px' /* 133.333% */,
  letterSpacing: '0.4px',
  marginTop: '5px'
};

export const TablePaginationStyle = {
  display: { mobile: 'block', desktop: 'flex' },
  alignItems: 'center',
  position: 'relative',
  bottom: 10,
  right: { desktop: -15 }
};

export const TablePaginationTitle = {
  color: `${colors.activeBlue400}`,
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px'
};

export const PaginationContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '40px',
  height: '16px',
  color: `${colors.primaryBlue700}`
};

export const inputFields = {
  padding: '16px 12px',
  height: '46px',
  display: 'flex',
  justifyContent: 'center',
  width: '400px',
  marginTop: '15px',
  marginLeft: '30px',
  gap: '16px',
  marginBottom: '15px'
};
