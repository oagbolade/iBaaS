import Stack from '@mui/material/Stack';
import { TableTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type Props = {
  tableTitle: string;
  searchTitle: string;
};

export const SearchSection = ({ tableTitle, searchTitle }: Props) => {
  return (
    <Stack
      sx={{
        padding: '25px',
      }}
      spacing={100}
      direction="row"
    >
      <TableTitle title={ tableTitle } />
      <PrimaryIconButton buttonTitle="Add New User" icon={<PersonAddIcon />} />
    </Stack>
  );
};
