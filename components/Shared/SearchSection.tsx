import Stack from '@mui/material/Stack';
import { TableTitle } from '@/components/Typography';
import { TextInput } from '@/components/TextFields/TextInput';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  tableTitle: string;
  searchTitle: string;
};

export const SearchSection = ({ tableTitle, searchTitle }: Props) => {
  return (
    <Stack
      sx={{
        margin: '50px 0',
      }}
      justifyContent="space-between"
      direction="row"
    >
      <TableTitle title={tableTitle} />
      <TextInput placeholder="Search users" icon={<SearchIcon />} />
    </Stack>
  );
};
