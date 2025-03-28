'use client';
import { Box } from '@mui/material';
import {
  useGetAllCountries,
} from '@/api/general/useGeography';
import { useGetAllTitles } from '@/api/general/useTitle';
import { FormSkeleton } from '@/components/Loaders';
import { CreateDirector } from '@/features/CustomerService/Form/CreateDirector';

export const CreateDirectorContainer = () => {
  const { title, isLoading: areTitlesLoading } = useGetAllTitles();
  const { countries, isLoading: areContriesLoading } = useGetAllCountries();

  if (
    areTitlesLoading ||
    areContriesLoading
  ) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <CreateDirector
      titles={title}
      countries={countries}
    />
  );
};
