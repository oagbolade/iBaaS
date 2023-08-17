import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AdminContext } from '@/features/Admin/AdminContext';
import { SetupContext } from '@/features/Setup/SetupContext';

type Props = {
  title: string;
  buttonTitle: string;
  isSetup?: boolean;
};

export const MainSection = (props: Props) => {
  const { toggleModal } = useContext(AdminContext);
  const { toggleSetupModal } = useContext(SetupContext);
  const isEditing = false;

  const handleClick = (isEditing: boolean) =>{
    if(props.isSetup) return toggleSetupModal(isEditing);
    toggleModal(isEditing);
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <PageTitle styles={{ fontSize: '28px' }} title={props.title} />
      <PrimaryIconButton
        onClick={() => handleClick(isEditing)}
        buttonTitle={props.buttonTitle}
        icon={<PersonAddIcon />}
      />
    </Stack>
  );
};
