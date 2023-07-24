import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const MainSection = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <PageTitle title="Manage Users" />
      <PrimaryIconButton buttonTitle="Add New User" icon={<PersonAddIcon />} />
    </Stack>
  );
};
