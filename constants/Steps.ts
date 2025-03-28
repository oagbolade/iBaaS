export const demandDepositSteps = [
  'Product Basic Details',
  'Interest Charges & Exceptions',
  'General Ledger',
  'Condition Setup',
  'Other Details'
];

export type DeleteActionSteps =
  | null
  | 'isDeleteConfirmation'
  | 'isPassword'
  | 'showToast'
  | 'password'
  | 'proceedToLockOrUnlockUser'
  | 'proceedToDelete'
  | 'proceedToDeleteRole'
  | 'confirm'
  | 'isLockConfirmation';

export type AddProductActionSteps =
  | null
  | 'isProductConfirmation'
  | 'showToast'
  | 'proceedToAddProduct';
