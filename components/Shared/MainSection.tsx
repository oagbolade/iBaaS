import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type Props = {
  title: string;
  buttonTitle: string;
}

export const MainSection = (props: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <PageTitle title={props.title} />
      <PrimaryIconButton buttonTitle={props.buttonTitle} icon={<PersonAddIcon />} />
    </Stack>
  );
};
