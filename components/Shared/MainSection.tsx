import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AdminContext } from '@/features/Admin/AdminContext';
import { SetupContext } from '@/features/Setup/SetupContext';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';

type Props = {
  title: string;
  buttonTitle?: string;
  isSetup?: boolean;
  isLien?: boolean;
  isCustomerService?: boolean;
  isOfficerTransfer?: boolean;
};

export const MainSection = (props: Props) => {
  const { toggleModal } = useContext(AdminContext);
  const { toggleSetupModal } = useContext(SetupContext);
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const isEditing = false;

  const handleClick = (isEditing: boolean) => {
    if (props.isSetup) return toggleSetupModal(isEditing);
    if (props.isCustomerService) return toggleCustomerServiceModal(isEditing);
    toggleModal(isEditing);
  };


  return (
    <Stack direction="row" justifyContent="space-between">
      <PageTitle styles={{ fontSize: '28px' }} title={props.title} />
      {!props.isLien && !props.isOfficerTransfer && (<PrimaryIconButton
        onClick={() => handleClick(isEditing)}
        buttonTitle={props.buttonTitle}
        icon={<PersonAddIcon />}
      />)}
    </Stack>
  );
};
