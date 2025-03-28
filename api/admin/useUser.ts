import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/react-query/constants';
import { UserLoginResponse } from '@/api/ResponseTypes/login';
import { getStoredUser, setStoredUser } from '@/utils/user-storage';

interface IUseUser {
  user: UserLoginResponse | null;
  updateUser: (user: UserLoginResponse) => void;
  clearUser: () => void;
}

export function useUser(): IUseUser {
  const queryClient = useQueryClient();
  const user = getStoredUser();
  // meant to be called from useAuth
  function updateUser(newUser: UserLoginResponse): void {
    // TODO: update the user in the query cache
    setStoredUser(newUser);
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClient.removeQueries({ queryKey: [queryKeys.user] });
  }

  return { user, updateUser, clearUser };
}
