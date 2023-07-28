import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AdminContext } from '@/pages/Admin/AdminContext';

type Props = {
  title: string;
  buttonTitle: string;
};

export const MainSection = (props: Props) => {
  const { toggleModal } = useContext(AdminContext);

  return (
    <Stack direction="row" justifyContent="space-between">
      <PageTitle title={props.title} />
      <PrimaryIconButton
        onClick={() => toggleModal()}
        buttonTitle={props.buttonTitle}
        icon={<PersonAddIcon />}
      />
    </Stack>
  );
};
