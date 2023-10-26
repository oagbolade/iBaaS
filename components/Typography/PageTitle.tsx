import Typography from '@mui/material/Typography';
import { pageTitle } from './styles';

type Props = {
  title: string;
  styles?: object;
};

export const PageTitle = ({ title, styles }: Props) => {return (
  <Typography sx={{ pageTitle, ...styles }}>
    <span dangerouslySetInnerHTML={{ __html: title }} />
  </Typography>
);};
