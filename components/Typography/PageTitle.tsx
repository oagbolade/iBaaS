import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { pageTitle } from './styles';

interface StylesI {
  fontSize?: string;
  fontWeight?: number;
  height?: string;
  width?: string;
  lineHeight?: string;
  color?: string;
  marginBottom?: string;
}

type Props = {
  title: string;
  styles?: StylesI | undefined;
};

export const PageTitle = ({ title, styles }: Props) => (
  <Typography sx={{ pageTitle, ...styles }}>
    <span dangerouslySetInnerHTML={{ __html: title }}></span>
  </Typography>
);
