'use client';
import Link from 'next/link';
import { Box } from '@mui/material';
import {
  managerContainer,
  managerPreview,
  previewContainer,
  previewStyle,
  accountTitle,
  accountNumber,
  mandateContainer,
  divider,
  mandateImageContainer,
  mandateStyle,
  mandateTitle,
  removeMandate,
} from './style';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PageTitle } from '@/components/Typography';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/add-mandate">
      <PrimaryIconButton
        buttonTitle="Add Mandate"
        customStyle={{ ...submitButton }}
      />
    </Link>
    ,
  </Box>,
];

export const ManageMandate = () => {
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={managerContainer}>
        <Box sx={managerPreview}>
          <Box sx={previewContainer}>
            <Box sx={previewStyle}>
              <PageTitle title="account number" styles={{ ...accountTitle }} />
              <PageTitle title="2110000004" styles={{ ...accountNumber }} />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="account name" styles={{ ...accountTitle }} />
              <PageTitle title="Yussuf Ahmed" styles={{ ...accountNumber }} />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="account type" styles={{ ...accountTitle }} />
              <PageTitle title="CASA" styles={{ ...accountNumber }} />
            </Box>
          </Box>
          <Box sx={previewContainer}>
            <Box sx={previewStyle}>
              <PageTitle title="usable balance" styles={{ ...accountTitle }} />
              <PageTitle title="₦297,200.00" styles={{ ...accountNumber }} />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="product type" styles={{ ...accountTitle }} />
              <PageTitle title="MFB Test" styles={{ ...accountNumber }} />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="status" styles={{ ...accountTitle }} />
              <PageTitle title="Active" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={mandateContainer}>
        <PageTitle title="All Mandates" styles={{ ...accountNumber }} />
        <Box sx={divider} />
        <Box sx={mandateImageContainer}>
          <Box sx={mandateStyle}>
            <Box sx={mandateTitle}>
              <PageTitle title="Photo" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Name" styles={{ ...accountTitle }} />
              <PageTitle
                title="Princess Chidinma"
                styles={{ ...accountNumber }}
              />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Signature" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PrimaryIconButton
                buttonTitle="Remove Mandate"
                customStyle={{ ...removeMandate }}
              />
            </Box>
          </Box>
          <Box sx={divider} />
        </Box>
        <Box sx={mandateImageContainer}>
          <Box sx={mandateStyle}>
            <Box sx={mandateTitle}>
              <PageTitle title="Photo" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Name" styles={{ ...accountTitle }} />
              <PageTitle title="Adamu Hassan" styles={{ ...accountNumber }} />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Signature" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PrimaryIconButton
                buttonTitle="Remove Mandate"
                customStyle={{ ...removeMandate }}
              />
            </Box>
          </Box>
          <Box sx={divider} />
        </Box>
        <Box sx={mandateImageContainer}>
          <Box sx={mandateStyle}>
            <Box sx={mandateTitle}>
              <PageTitle title="Photo" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Name" styles={{ ...accountTitle }} />
              <PageTitle
                title="Johnson Adebisi"
                styles={{ ...accountNumber }}
              />
            </Box>
            <Box sx={mandateTitle}>
              <PageTitle title="Signature" styles={{ ...accountTitle }} />
              <PageTitle title="image" />
            </Box>
            <Box sx={mandateTitle}>
              <PrimaryIconButton
                buttonTitle="Remove Mandate"
                customStyle={{ ...removeMandate }}
              />
            </Box>
          </Box>
          <Box sx={divider} />
        </Box>
      </Box>
    </Box>
  );
};
