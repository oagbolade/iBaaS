import { AdminContainer } from '@/pages/Admin';

export const Users = () => {
  return (
    <AdminContainer
      title="Manage Users"
      buttonTitle="Add New User"
      tableTitle='View All Users'
      searchTitle='Search users'
    />
  );
};
