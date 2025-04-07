import { Box } from '@mui/material';
import { title } from '../../Forms/style';
import {
  IAccountDetailsResults,
  IMandateInfo
} from '@/api/ResponseTypes/customer-service';
import { PageTitle } from '@/components/Typography';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { Status } from '@/components/Labels';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
  mandateInfo: IMandateInfo[] | undefined;
}

export const AccountInformationPreview = ({
  accountDetails,
  mandateInfo
}: Props) => {
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
      <PageTitle title="Account Information" styles={title} />

      <SubTitle title="Account Number" />
      <Details title={accountDetails?.accountnumber || 'NIL'} />

      <SubTitle title="Account Name" />
      <Details title={accountDetails?.accounttitle || 'NIL'} />

      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <SubTitle title="Photo" />
        <img
          src={mandateInfo && mandateInfo[0]?.customerPictBase64}
          alt="customer pic"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
          margin: '20px 0'
        }}
      >
        <SubTitle title="Signature" />
        <img
          src={mandateInfo && mandateInfo[0]?.customerSignBase64}
          alt="customer pic"
        />
      </Box>

      <SubTitle title="Product Name" />
      <Details title={accountDetails?.prodname || 'NIL'} />

      <SubTitle title="Branch" />
      <Details title={accountDetails?.branch || 'NIL'} />

      <SubTitle title="Book Balance" />
      <Details title={accountDetails?.bkbal || '0.00'} />

      <SubTitle title="Effective Balance" />
      <Details title={accountDetails?.effbal || '0.00'} />

      <SubTitle title="Usable Balance" />
      <Details title={accountDetails?.usebal || '0.00'} />

      <SubTitle title="Source Type" />
      <Details title={accountDetails?.source || 'NIL'} />

      <SubTitle title="Source" />
      <Details title={accountDetails?.source || 'NIL'} />

      <Box sx={{ marginBottom: '20px' }}>
        <SubTitle title="Account Status" />
        <Status
          label={accountDetails.status ? 'Active' : 'Inative'}
          status={accountDetails.acctstatus ? 'success' : 'danger'}
        />
      </Box>

      <SubTitle title="BVN" />
      <Details title={accountDetails?.bvn || 'NIL'} />

      <SubTitle title="Total Charge" />
      <Details title={accountDetails?.totalCharge || 'NIL'} />
    </Box>
  );
};
