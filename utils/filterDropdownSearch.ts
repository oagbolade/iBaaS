import { number } from 'yup';
import { OptionsI } from '@/components/FormikFields/FormSelectField';

export const filterDropdownSearch = (data: OptionsI[], searchTerm: string) => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterGeneralLedgerDropdownSearch = (
  data: OptionsI[],
  searchTerm: string | number
): OptionsI[] => {
  const normalizedSearchTerm = String(searchTerm).toLowerCase().trim();

  return data.filter((item) => {
    const nameMatch = item.name?.toLowerCase().includes(normalizedSearchTerm);
    const numberMatch =
      item?.value != null &&
      String(item?.value).toLowerCase().includes(normalizedSearchTerm);

    return nameMatch || numberMatch;
  });
};
