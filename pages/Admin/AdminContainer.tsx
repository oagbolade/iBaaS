import Box from '@mui/material/Box';
import { MainSection, SearchSection } from '@/components/Shared';
import { MuiTableContainer } from '@/components/Table';

type Props = {
  title: string;
  buttonTitle: string;
  tableTitle: string;
  searchTitle: string;
}

export const AdminContainer = (props: Props) => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
      }}
    >
      <MainSection title={props.title} buttonTitle={props.buttonTitle}/>
      <SearchSection tableTitle={props.tableTitle} searchTitle={props.searchTitle} />
      <MuiTableContainer columns={[]} />
    </Box>
  );
};
