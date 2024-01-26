import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Grid } from '@mui/material';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import { SetupContext } from '@/features/Setup/SetupContext';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';
import { useCurrentBreakpoint } from '@/utils/useCurrentBreakpoint';
import { AdminContext } from '@/features/Admin-old/AdminContext';

type Props = {
  title: string;
  buttonTitle?: string;
  isSetup?: boolean;
  isLien?: boolean;
  isCustomerService?: boolean;
  isOfficerTransfer?: boolean;
};

export const MainSection = (props: Props) => {
  const { isMobile } = useCurrentBreakpoint();
  const { toggleModal } = useContext(AdminContext);
  const { toggleSetupModal } = useContext(SetupContext);
  const { toggleCustomerServiceModal } = useContext(CustomerServiceContext);
  const isEditing = false;

  const handleClick = (shouldEdit: boolean) => {
    if (props.isSetup) return toggleSetupModal(shouldEdit);
    if (props.isCustomerService) return toggleCustomerServiceModal(isEditing);
    toggleModal(shouldEdit);
  };

  const setDirection = () => {
    if (isMobile) return 'column';
    return 'row';
  };

  return (
    <Stack direction={setDirection()} justifyContent="space-between">
      <Grid item mobile={12} desktop={12}>
        <PageTitle styles={{ fontSize: '28px' }} title={props.title} />
      </Grid>
      <Grid mt={{ mobile: 3, tablet: 0 }} item mobile={8} desktop={12}>
        {!props.isLien && !props.isOfficerTransfer && (
          <PrimaryIconButton
            onClick={() => {
              return handleClick(isEditing);
            }}
            buttonTitle={props.buttonTitle}
            icon={<PersonAddIcon />}
          />
        )}
      </Grid>
    </Stack>
  );
};
