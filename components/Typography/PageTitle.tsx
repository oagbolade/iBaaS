import Typography from '@mui/material/Typography';
import { pageTitle } from './styles';

type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => (
  <Typography sx={pageTitle}>{title}</Typography>
);
