import { Box } from '@mui/material';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import { Status } from '@/components/Labels';
import { FormSkeleton } from '@/components/Loaders';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { PageTitle } from '@/components/Typography';
import { title } from '@/features/Operation/Forms/style';

interface Props {
  // eslint-disable-next-line react/no-unused-prop-types
  loading?: boolean;
  accountDetails?: IGLAccount | undefined;
}
export const GLAccountPreviewContent = ({ accountDetails, loading }: Props) => {
  if (!accountDetails) {
    return null;
  }

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      {loading && <FormSkeleton noOfLoaders={5} />}

      <PageTitle title="GL Information" styles={title} />

      <SubTitle title="Account Name" />
      <Details title={accountDetails.acctName || 'NIL'} />

      <SubTitle title="Gl Number" />
      <Details title={accountDetails.glNumber || 'NIL'} />

      <SubTitle title="Product Name" />
      <Details title={accountDetails.prodType || 'NIL'} />

      <SubTitle title="Name" />
      <Details title={accountDetails.name || 'NIL'} />

      <SubTitle title="Book Balance" />
      <Details title={accountDetails.BKBalance || 'NIL'} />

      <SubTitle title="Date Open" />
      <Details title={accountDetails.DateOpened || 'NIL'} />

      <SubTitle title="Usable Balance" />
      <Details title={accountDetails.gl_ClassCode || 'NIL'} />
      <Box sx={{ marginBottom: '20px' }}>
        <SubTitle title="Account Status" />
        <Status
          label={accountDetails.status ? 'Active' : 'Inative'}
          status={accountDetails.status ? 'success' : 'danger'}
        />
      </Box>
    </Box>
  );
};
