import { AdminContainer } from '@/pages/Admin';

export const Role = () => {
  return (
    <AdminContainer
      title="Manage Role"
      buttonTitle="Add New Role"
      tableTitle="View All Roles"
      searchTitle="Search by name or description"
    />
  );
};