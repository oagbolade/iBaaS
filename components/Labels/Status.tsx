import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { TableTitle } from '@/components/Typography';
import { TextInput } from '@/components/TextFields/TextInput';
import SearchIcon from '@mui/icons-material/Search';
import CircleIcon from '@mui/icons-material/Circle';
import { labelTypography } from './styles';

interface StatusMap {
  [status: string]: {
    color: string;
    border: string;
    background: string;
  };
}

const statusMap: StatusMap = {
  success: {
    color: '#36743D',
    border: '1px solid #BEF2B9',
    background: '#F1FEF1',
  },
  warning: {
    color: '#AF5F26',
    border: '1px solid #AF5F26',
    background: '#FDED94',
  },
  danger: {
    color: '#DC4437',
    border: '1px solid #DC4437',
    background: '#F4B7B5',
  }
}

type Props = {
  label: string;
  status: string;
};

export const Status = ({ label, status = 'success' }: Props) => {
  return (
      <Box
        sx={{
          ...labelTypography,
          color: statusMap[status].color,
          border: statusMap[status].border,
          backgroundColor: statusMap[status].background,
        }}
        style={{ 
          backgroundColor: statusMap[status].background,
         }}
      >
       <CircleIcon sx={{ fontSize: 12, marginBottom: '2px' }} /> {label}
      </Box>
  );
};
