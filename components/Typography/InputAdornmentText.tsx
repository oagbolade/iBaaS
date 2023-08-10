import Typography from '@mui/material/Typography';
import { inputAdornment } from './styles';

type Props = {
  children: React.ReactNode;
};

export const InputAdornmentText = ({ children }: Props) => (
  <Typography sx={inputAdornment}>{children}</Typography>
);
