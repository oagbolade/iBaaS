import Typography from '@mui/material/Typography';
import { stepperLabel } from './styles';

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

export const StepperLabel = ({ title, styles }: Props) => {
  return (
    <Typography sx={stepperLabel} style={styles}>
      {title}
    </Typography>
  );
};
