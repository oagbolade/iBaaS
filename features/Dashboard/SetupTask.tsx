import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { AddBranchStyle, todoSetup } from './styles';
import { CheckboxInputV2 } from '@/components/FormikFields/CheckboxInputV2';
import colors from '@/assets/colors';

interface SetupTaskProps {
  label: string;
  isChecked: boolean;
  link: string;
  linkText: string;
}

export const SetupTask = ({
  label,
  isChecked,
  link,
  linkText
}: SetupTaskProps) => (
  <Box sx={todoSetup}>
    <CheckboxInputV2
      styles={{
        color: colors.neutral700,
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 600
      }}
      label={label}
      readOnly
      isChecked={isChecked}
    />
    {!isChecked && (
      <Link href={link}>
        <Typography sx={AddBranchStyle}>{linkText}</Typography>
      </Link>
    )}
  </Box>
);
