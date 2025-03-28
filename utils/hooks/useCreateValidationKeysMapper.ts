export interface ValidationKeysMapper {
  [key: string]: string[];
}

export const useCreateValidationKeysMapper = (
  removeCorporateDetails: boolean
) => {
  // List of required fields for the customer creation form
  const validationKeysMapper: ValidationKeysMapper = {
    personalDetails: [
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
    ],
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
    referrerDetails: ['refname', 'introid', 'refphone', 'acctOfficer']
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
