import Typography from '@mui/material/Typography';
import { currencyStyle } from './styles';

type Props = {
  currency: string;
};

type ICurrencyType = {
  [key: string]: string;
};

export const CurrencySymbol = ({ currency }: Props) => {
  const SYMBOLS: ICurrencyType = {
    naira: '₦'
  };
  return <Typography sx={currencyStyle}>{SYMBOLS[currency]}</Typography>;
};
