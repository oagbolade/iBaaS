import React, { useEffect } from 'react';
import { Box, FormLabel, Grid, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { CheckboxInputV2 } from '@/components/FormikFields/CheckboxInputV2';

interface PermissionData {
  pointing: number;
  typeP: number | string;
  swing: number;
  populate: number;
  post: number;
}

interface PermissionsSectionProps {
  data: PermissionData;
  setData?: React.Dispatch<React.SetStateAction<PermissionData>>;
}

export const PermissionsSection: React.FC<PermissionsSectionProps> = ({
  data,
  setData
}) => {
  const searchParams = useSearchParams();
  const { isTablet } = useCurrentBreakpoint();
  const { isLoading } = useGlobalLoadingState();
  const { setDirection } = useSetDirection();
  const isEditing = searchParams.get('isEditing');

  const queryPointing = searchParams.get('pointing');
  const querytypeP = searchParams.get('typeP');
  const querySwing = searchParams.get('swing');
  const queryPopulate = searchParams.get('populate');
  const queryPost = searchParams.get('post');

  useEffect(() => {
    if (isEditing) {
      let typePValue: any;
      if (querytypeP === 'd') {
        typePValue = 0;
      } else {
        typePValue = 1;
      }
      setData?.({
        pointing: Number(queryPointing),
        typeP: typePValue,
        swing: Number(querySwing),
        populate: Number(queryPopulate),
        post: Number(queryPost)
      });
    }
  }, [
    isEditing,
    queryPointing,
    querytypeP,
    querySwing,
    queryPopulate,
    queryPost,
    setData
  ]);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={1} />;
  }

  return (
    <Box
      sx={{
        padding: { mobile: 6, tablet: '30px 32px' },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '50%',
        borderLeft: `1px solid ${colors.neutral300}`
      }}
    >
      <LargeTitle title="Permissions" />
      <Box mt={2}>
        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
          <Box mt={2}>
            <RadioButtons
              options={[
                { label: 'Yes', value: 1 },
                { label: 'No', value: 0 }
              ]}
              id="createPostingLimitPermission"
              title="Pointing?"
              name="pointing"
              value={data.pointing.toString()}
              handleCheck={(value: boolean) => {
                if (setData) setData({ ...data, pointing: value ? 1 : 0 });
              }}
            />
          </Box>
        </Grid>

        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
          <Box mt={2}>
            <RadioButtons
              disabled={data.pointing === 0}
              options={[
                { label: 'Credit', value: 1 },
                { label: 'Debit', value: 0 }
              ]}
              id="createPostingLimit"
              title="Pointing Type?"
              name="typeP"
              value={data.typeP.toString()}
              handleCheck={(value: boolean) => {
                if (setData) setData({ ...data, typeP: value ? 'c' : 'd' });
              }}
            />
          </Box>
        </Grid>

        <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }} mt={2}>
          <FormLabel aria-label="" aria-controls="" sx={RadioButtonTitle}>
            Actions?
          </FormLabel>

          <Stack
            mt={1}
            direction={setDirection()}
            flexWrap="wrap"
            gap={2}
            alignItems="flex-start"
          >
            <CheckboxInputV2
              className="permissionsCheckbox"
              label="Swing"
              name="swing"
              isChecked={!!data.swing}
              handleCheck={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (setData)
                  setData({ ...data, swing: e.target.checked ? 1 : 0 });
              }}
            />

            <CheckboxInputV2
              className="permissionsCheckbox"
              label="Is System Posting?"
              name="post"
              isChecked={!!data.post}
              handleCheck={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (setData)
                  setData({ ...data, post: e.target.checked ? 1 : 0 });
              }}
            />

            <CheckboxInputV2
              className="permissionsCheckbox"
              label="Populate General Ledger"
              name="populate"
              isChecked={!!data.populate}
              handleCheck={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (setData)
                  setData({ ...data, populate: e.target.checked ? 1 : 0 });
              }}
            />
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};
