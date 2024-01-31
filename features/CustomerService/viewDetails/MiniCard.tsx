import React from 'react';
import Link from 'next/link';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { miniCardContainer } from '@/features/Report/CustomReport/GroupReport/styles';
import { greetingStyle } from '@/components/NavBar/styles';
import colors from '@/assets/colors';
import { title } from '@/features/Operation/Forms/style';
import { PageTitle } from '@/components/Typography';
import { SubTitle, Details } from '@/features/Administrator/Role/TellerRole';

type Props = {
  customerType?: string;
  name?: string;
  titles: string;
};

export const MiniCard = ({ customerType, name, titles }: Props) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
      }}
    >
      <PageTitle title={titles} styles={title} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />

      <SubTitle title={customerType} />
      <Details title={name} />
    </Box>
  );
};
