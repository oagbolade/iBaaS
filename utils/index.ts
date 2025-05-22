export { handleRedirect } from './handleRedirect';
export { useCurrentBreakpoint } from './hooks/useCurrentBreakpoint';

export const frequencyOptions = [
  { name: 'Days', value: '001' },
  { name: 'Weeks', value: '002' },
  { name: 'Forthnight', value: '003' },
  { name: 'Month', value: '004' },
  { name: 'Quarter', value: '005' },
  { name: 'Bi-Annual', value: '006' },
  { name: 'Annual', value: '007' }
];

export const fetchFrequencyOptions = (value: string) => {
  return (
    frequencyOptions.find((option) => option.name === value?.trim())?.value ||
    ''
  );
};

export const frequencyTermsDays = [
  {
    value: '1',
    label: '001',
    name: 'Days'
  },
  {
    value: '7',
    label: '002',
    name: 'Weeks'
  },
  {
    value: '14',
    label: '003',
    name: 'Forthnight'
  },
  {
    value: '30',
    label: '004',
    name: 'Months'
  },
  {
    value: '90',
    label: '005',
    name: 'Quarter'
  },
  {
    value: '182',
    label: '006',
    name: 'Bi-Annual'
  },
  {
    value: '365',
    label: '007',
    name: 'Annual'
  }
];