import Typography from '@mui/material/Typography';
import { tableTitle } from './styles';

type Props = {
  title: string;
};

export const TableTitle = ({ title }: Props) => (
  <Typography sx={tableTitle}>{title}</Typography>
);
