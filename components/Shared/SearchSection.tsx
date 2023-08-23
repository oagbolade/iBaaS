import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { TableTitle } from '@/components/Typography';
import { TextInput } from '@/components/TextFields/TextInput';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  tableTitle: string;
  searchTitle: string;
  searchFilters?: any;
};

export const SearchSection = ({
  tableTitle,
  searchTitle,
  searchFilters,
}: Props) => {
  return (
    <Box>
      <Stack
        sx={{
          margin: '50px 0',
        }}
        justifyContent="space-between"
        direction="row"
      >
        <TableTitle title={tableTitle} />
        <TextInput placeholder={searchTitle} icon={<SearchIcon />} />
      </Stack>
      {searchFilters}
    </Box>
  );
};
