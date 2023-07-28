import Typography from '@mui/material/Typography';
import { pageTitle } from './styles';

interface StylesI {
  fontSize?: string;
  fontWeight?: number;
  height?: string;
  width?: string;
  lineHeight?: string;
  color?: string;
}

type Props = {
  title: string;
  styles?: StylesI | undefined;
};

export const PageTitle = ({ title, styles }: Props) => (
  <Typography sx={{pageTitle, ...styles}}>{title}</Typography>
);
