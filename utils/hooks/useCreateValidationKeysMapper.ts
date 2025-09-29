export interface ValidationKeysMapper {
  [key: string]: string[];
}

export const useCreateValidationKeysMapper = (
  removeCorporateDetails: boolean,
  isEditing?: boolean
) => {
  let personalDetails = [
    'title',
    'surName',
    'firstName',
    'othername',
    'dob',
    'sex',
    'nationality',
    'statecode',
    'mothermdName',
    'bvn',
    'phone1',
    'natIDNo',
    'taxIDNo',
    'residentCountry',
    'residentStatecode',
    'residentTowncode',
    'address',
    'sectorcode',
    'occupation',
    'eduLevel'
  ];

  if (isEditing) {
    // Remove 'natIDNo'
    personalDetails = personalDetails.filter((key) => key !== 'natIDNo');

    // Insert 'nin' at the correct index (where 'natIDNo' was)
    personalDetails.splice(12, 0, 'nin');
  }

  // List of required fields for the customer creation form
  const validationKeysMapper: ValidationKeysMapper = {
    personalDetails,
    businessDetails: [
      'bizState',
      'bizCtry',
      'bizAddress',
      'bizPhone3',
      'sigClass',
      'bizTowncode'
    ],
    nextOfKinDetails: [
      'nextOfKinphone',
      'nextOfKinaddr',
      'nextOfKin',
      'nextOfKintown',
      'nextOfKinState',
      'nextOfKinRel'
    ],
    identificationDetails: ['idType', 'idIssueDate', 'idExpryDate', 'iDno'],
  };

  if (!removeCorporateDetails) {
    validationKeysMapper.corporateCustomerPersonalDetails = [
      'compname',
      'regno',
      'nationality',
      'dob',
      'companyStatecode',
      'companyTowncode',
      'address',
      'sectorcode',
      'bvn',
      'taxId',
      'contact',
      'compObjective',
      'phone1',
      'secphone',
      'secName',
      'email',
      'scuml',
      'shareCapital',
      'turnOver'
    ];
  }

  return { validationKeysMapper };
};
