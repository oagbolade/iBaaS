import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import { labelTypography } from './styles';
import colors from '@/assets/colors';

interface StatusMap {
  [status: string]: {
    color: string;
    border: string;
    background: string;
  };
}

const statusMap: StatusMap = {
  success: {
    color: `${colors.activeGreen500}`,
    border: `1px solid ${colors.activeGreen200}`,
    background: `${colors.activeGreen100}`
  },
  warning: {
    color: `${colors.activeYellow500}`,
    border: `1px solid ${colors.activeYellow500}`,
    background: `${colors.activeYellow200}`
  },
  danger: {
    color: `${colors.primaryRed400}`,
    border: `1px solid ${colors.primaryRed400}`,
    background: `${colors.primaryRed100}`
  },
  matured: {
    color: `${colors.activeBlue700}`,
    border: `1px solid ${colors.activeBlue200}`,
    background: `${colors.activeBlue100}`
  },
  pending: {
    color: `${colors.activeYellow500}`,
    border: `1px solid ${colors.activeYellow500}`,
    background: `${colors.activeYellow200}`
  }
};

type Props = {
  label: string;
  status: string;
};

export const Status = ({ label, status = 'success' }: Props) => {
  return (
    <Box
      sx={{
        ...labelTypography,
        color: statusMap[status]?.color,
        border: statusMap[status]?.border,
        backgroundColor: statusMap[status]?.background
      }}
      style={{
        backgroundColor: statusMap[status]?.background
      }}
    >
      <CircleIcon sx={{ fontSize: 12, marginBottom: '2px' }} /> {label}
    </Box>
  );
};
