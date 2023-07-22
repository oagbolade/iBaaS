import Stack from "@mui/material/Stack";
import { PageTitle } from "@/components/Typography";

export const MainSection = () => {
  return (
    <Stack sx={{
      padding: '25px',
    }} spacing={140} direction="row">
      <PageTitle title="Manage Users" />
      <PageTitle title="Add Button Here" />
    </Stack>
  );
};
