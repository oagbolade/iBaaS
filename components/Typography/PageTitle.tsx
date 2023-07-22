'use client';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
};

const pageTitle = {
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36px',
  width: '187px',
  height: '36px',
};

export const PageTitle = ({ title }: Props) => (
  <Typography sx={pageTitle}>{title}</Typography>
);
