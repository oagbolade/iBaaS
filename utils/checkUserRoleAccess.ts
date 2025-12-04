import { getStoredMenuItems } from './user-storage';
import { AccessRules } from '@/constants/AccessRules';

const menuItems = getStoredMenuItems() || [];

export const checkMultipleUserRoleAccess = (
  menuName: string,
  userRole: string
) => {
  let userRoleIsContainedInRule = false;

  Object.keys(AccessRules).forEach((key) => {
    if (key === menuName) {
      const foundRole = AccessRules[key].some(
        (role) => role.toLocaleLowerCase() === userRole.toLocaleLowerCase()
      );
      userRoleIsContainedInRule = foundRole;
    }
  });

  if (!userRoleIsContainedInRule) {
    throw new Error(`Role ${userRole} is not found in the AccessRules`);
  }

  return menuItems.some(
    (item) => userRole.toLowerCase() === item.menu_name.toLowerCase()
  );
};

const checkUserRoleAccess = (roleNames: string[]): boolean => {
  if (roleNames.length > 1) {
    return true;
  }

  return roleNames.some((roleName) =>
    menuItems.some(
      (item) => roleName.toLowerCase() === item.menu_name.toLowerCase()
    )
  );
};

const excludedModules = ['Dashboard', 'Bulk Creation'];

export const shouldDisableMenuItem = (name: string): boolean => {
  if (excludedModules.includes(name)) {
    return false;
  }

  return !AccessRules[name] || !checkUserRoleAccess(AccessRules[name]);
};
