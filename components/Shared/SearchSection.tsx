import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import { TableTitle } from '@/components/Typography';
import { TextInput } from '@/components/FormikFields/TextInput';
import { useCurrentBreakpoint } from '@/utils/useCurrentBreakpoint';
import { useSetDirection } from '@/utils/useSetDirection';

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
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Stack
        sx={{
          margin: '50px 0',
        }}
        justifyContent="space-between"
        direction={setDirection()}
      >
        <TableTitle title={tableTitle} />
        <Grid item mt={{ mobile: 3, tablet: 0 }} mobile={8} desktop={12}>
          <TextInput
            customStyle={{
              width: setWidth(),
            }}
            placeholder={searchTitle}
            icon={<SearchIcon />}
          />
        </Grid>
      </Stack>
      {searchFilters}
    </Box>
  );
};
