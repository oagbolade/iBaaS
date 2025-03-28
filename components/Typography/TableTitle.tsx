import Typography from '@mui/material/Typography';
import { tableTitle } from './styles';

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
  title?: string | undefined;
  styles?: StylesI | undefined;
};

export const TableTitle = ({ title, styles }: Props) => {
  return (
    <Typography sx={tableTitle} style={styles}>
      {title}
    </Typography>
  );
};
