import { OptionsI } from '@/components/FormikFields/FormSelectField';

export const filterDropdownSearch = (data: OptionsI[], searchTerm: string) => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
