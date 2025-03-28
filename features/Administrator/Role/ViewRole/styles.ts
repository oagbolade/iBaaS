import styled from 'styled-components';
import colors from '@/assets/colors';

export const topBorderSection = {
  width: '1039px',
  height: '109px',
  margin: '24px 0',
  display: 'flex',
  padding: '19px 9px 34px 29px',
  borderRadius: '5px',
  border: '1px solid #E3E8EE'
};

export const avatarStyle = {
  background: `${colors.neutral300}`,
  color: 'black',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36px',
  padding: '15px 13px',
  width: '60px',
  height: '60px'
};

export const CheckBoxWrapper = styled.section`
  .MuiTypography-root {
    font-size: 12px;
    width: 126px;
  }

  .MuiGrid-root {
    padding: 2px 32px;
  }

  .Mui-disabled {
    color: ${colors.activeBlue400};
  }
`;
