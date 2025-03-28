import { Box } from '@mui/material';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

interface Props {
    accountDetails?: IAccountDetailsResults | undefined;
}

export const SignatoryInformationPreview = ({ accountDetails }: Props) => {
  if (!accountDetails) {
    return (
        <Box mb={3} sx={{ width: '200px', height: '200px' }}>
          <NoDataAvailable
            message="No account information available, please select an account number"
            width={200}
            height={200}
          />
        </Box>
    );
  }

    return (
      <Box
        mb={{ mobile: 30, tablet: 0 }}
        sx={{
          padding: { mobile: 6, tablet: 0 },
          alignItems: { mobile: 'center', tablet: 'normal' }
        }}
      >
        <SubTitle title="SIGNATORY" />
        <Details title="NIL" />
  
        <SubTitle title="DESIGNATION" />
        <Details title="NIL" />
  
        <SubTitle title="MANDATE INSTRUCION" />
        <Details title="NIL" />
  
        <SubTitle title="SOLE SIGNATORY" />
        <Details title="NIL" />
      </Box>
    );
  };