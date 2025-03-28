import { IAccounts } from '@/api/ResponseTypes/admin';

interface Menu {
  [x: string]: number;
  menu_id: number;
}

export type MenuIDList = Menu[];

export const getCheckedMenus = (
  container: HTMLCollectionOf<Element>
): MenuIDList => {
  const checkedMenus: MenuIDList = [];

  // Loop through each authPriviledgeContainers
  for (let i = 0; i < container.length; i += 1) {
    // Get the menu id of each element
    const menuID = container[i].getElementsByTagName('input')[0].name;
    const isChecked =
      container[i].getElementsByTagName('input')[0].value === 'true';

    // if current menu is checked, add to request body
    if (isChecked) {
      checkedMenus.push({ menu_id: Number(menuID) });
    }
  }

  return checkedMenus;
};

export const getMenuIDs = (
  container: HTMLCollectionOf<Element>
): MenuIDList => {
  const checkedMenus: MenuIDList = [];

  for (let i = 0; i < container.length; i += 1) {
    const menuID = container[i].getElementsByTagName('input')[0].name;
    checkedMenus.push({ menu_id: Number(menuID) });
  }

  return checkedMenus;
};

// Function to remove an id from the checkedlist
export function removeMenuIdFromList(list: any[], id: number): MenuIDList {
  return list.filter((item: { menu_id: number }) => item.menu_id !== id);
}

// Function to remove an id from the checkedlist
export function removeAccountNumberFromList(list: any[], id: number): IAccounts[] {
  return list.filter((item: { accountNumber: number }) => item.accountNumber !== id);
}

// Function to add an id to the checkedlist
export const addMenuIdToList = (list: any[], id: number): MenuIDList => {
  // Create a copy of the current checkList state
  const updatedCheckList = [...list];

  updatedCheckList.push({ menu_id: id });
  return updatedCheckList;
};

// Function to add an id to the checkedlist
export const addAccountNumberToList = (list: any[], accountNumber: string, customerId?: string): IAccounts[] => {
  // Create a copy of the current checkList state
  const updatedCheckList = [...list];

  updatedCheckList.push({ accountNumber, id: customerId });
  return updatedCheckList;
};

// Function to check of id is in checkedlist
export function isMenuIDInList(list: any[], id: number): boolean {
  let found = false;
  list.forEach((item) => {
    if (item.menu_id === id) {
      found = true;
    }
  });

  return found;
}

// Function to check of id is in checkedlist
export function isAccountNumberInList(list: any[], id: number): boolean {
  let found = false;
  list.forEach((item) => {
    if (item.accountNumber === id) {
      found = true;
    }
  });

  return found;
}
