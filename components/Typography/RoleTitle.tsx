import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { roleContain, roleTitles, roleTableTitle } from './styles';
import { InfoIcon } from '@/assets/svg';
import colors from '@/assets/colors';

type Props = {
  roleTitle: string;
  title: string;
};

export const RoleTitle = ({ roleTitle, title }: Props) => {
  return (
    <Box sx={roleContain}>
      <InfoIcon color={`${colors.activeBlue400}`} />{' '}
      <Typography sx={roleTitles}>{roleTitle}</Typography>{' '}
      <Typography sx={roleTableTitle}>{title}</Typography>
    </Box>
  );
};
