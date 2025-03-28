export const checkAllMenus = (
  container: HTMLCollectionOf<Element>,
  isChecked: boolean
): void => {
  // Loop through each container
  for (let i = 0; i < container.length; i += 1) {
    // Get the menu id of each element
    const currentMenu = container[i].getElementsByTagName('input')[0];

    // if current menu is checked, add to request body
    // currentMenu.checked = !isChecked;
    currentMenu.checked = true;
  }
};
