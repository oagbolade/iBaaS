import { getStoredUser } from './user-storage';
import { AccessRules } from '@/constants/AccessRules';

const user = getStoredUser();
const userItems = user?.menuItems || [];

export const checkMultipleUserRoleAccess = (
  menuName: string,
  userRole: string
): boolean => {
  let userRoleIsContainedInRule = false;

  Object.keys(AccessRules).forEach((key) => {
    if (key === menuName) {
      const foundRole = AccessRules[key].some((role) => role === userRole);
      userRoleIsContainedInRule = foundRole;
    }
  });

  if (!userRoleIsContainedInRule) {
    throw new Error(`Role ${userRole} is not found in the AccessRules`);
  }

  return userItems.some(
    (item) => userRole.toLowerCase() === item.menu_name.toLowerCase()
  );
};

export const checkUserRoleAccess = (roleNames: string[]): boolean => {
  if (roleNames.length > 1) {
    return true;
  }

  return roleNames.some((roleName) =>
    userItems.some(
      (item) => roleName.toLowerCase() === item.menu_name.toLowerCase()
    )
  );
};

const excludedModules = ['Dashboard'];

export const shouldDisableMenuItem = (name: string): boolean => {
  if (excludedModules.includes(name)) {
    return false;
  }

  return !AccessRules[name] || !checkUserRoleAccess(AccessRules[name]);
};
