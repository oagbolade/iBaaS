import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { ViewLoan } from '@/features/Loan/LoanDirectory/ViewLoan';
import { LoanDetails } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  useGetLoanAccountDetails,
  useGetLoansProductDetailCode
} from '@/api/loans/useCreditFacility';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { renderComponentWithQueryProvider } from '@/mocks/renderComponent';
import {
  ICustomerDetails,
  IProductDetails
} from '@/schemas/schema-values/loan';

import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}));

jest.mock('../../../api/loans/useCreditFacility', () => ({
  useGetLoansProductDetailCode: jest.fn(),
  useGetLoanAccountDetails: jest.fn()
}));

jest.mock('../../../api/customer-service/useCustomer', () => ({
  useGetAccountDetails: jest.fn()
}));
const mockLoanAccDetails: ILoanAccountDetails = {
  out_Interest: 0,
  out_penal: 0,
  startdate: '',
  matdate: '',
  currentbalance: 0,
  settlementAcctBal: 0,
  totaldays: '',
  intRate: '',
  termFreq: '',
  repaytype: 0,
  loanTerm: '',
  branch: '',
  productCode: '',
  settlementacct1: '',
  loanAmount: 0,
  colltype: 0,
  customerID: '',
  colldesc: '',
  loansource: 0,
  narration: '',
  calcmethod: 0,
  status: '',
  fullName: '',
  writeOffGL: '',
  out_ExtInterest: 0,
  repaymentType: '',
  branchName: '',
  calculationName: '',
  productName: '',
  collvalue: ''
};

const mockCustomerDetails: ICustomerDetails = {
  gender: 'Male',
  title: 'Mr',
  surName: 'Smith',
  firstName: 'John',
  othername: 'David',
  fullName: 'John David Smith',
  bvn: '12345678901',
  introid: 'INT123',
  mothermdName: 'Mary Smith',
  residentCountry: 'United States',
  bizState: 'California',
  bizAddress: '123 Business Street',
  dob: '1990-01-01',
  sex: 'M',
  nationality: 'American',
  eduLevel: "Bachelor's Degree",
  statecode: 'CA',
  occupation: 'Software Engineer',
  address: '456 Main Street',
  address2: 'Apt 789',
  residentStatecode: 'CA',
  residentTowncode: 'LAX',
  phone1: '+1234567890',
  phone2: '+1987654321',
  phone3: '+1122334455',
  phone4: '+1555666777',
  email: 'john.smith@email.com',
  nextOfKin: 'Jane Smith',
  nextOfKinphone: '+1999888777',
  nextOfKinaddr: '789 Family Road',
  idType: 'Passport',
  iDno: 'AB123456',
  idIssueDate: '2020-01-01',
  idExpryDate: '2030-01-01',
  sectorcode: 'SEC001',
  customerType: 'Individual',
  relcustid: 'REL123',
  relationtype: 'Primary',
  refname: 'Robert Johnson',
  refphone: '+1444555666',
  signacct: 'YES',
  bizCtry: 'United States',
  bizTowncode: 'SFO',
  bizPhone3: '+1777888999',
  residPermNo: 'RES123456',
  residExpDate: '2025-01-01',
  empBusName: 'Tech Corp',
  fatcaid: 'FATCA123',
  ctzorRes: 'Citizen',
  psprtAlnNO: 'PSPT123456',
  psprtIssDate: '2020-01-01',
  psprtExpDate: '2030-01-01',
  ssn: '123-45-6789',
  nextOfKinRel: 'Spouse',
  nextOfKinState: 'CA',
  nextOfKintown: 'Los Angeles',
  sigClass: 'A',
  regno: 'REG123456',
  acctOfficer: 'Michael Brown',
  taxId: 'TAX123456',
  contact: 'John Smith',
  secName: 'Security Name',
  secphone: '+1333444555',
  shareCapital: '1000000',
  turnOver: '5000000',
  scuml: 'SCUML123',
  compObjective: 'Technology Services',
  userid: 'USER123',
  authid: 'AUTH123',
  accounttitle: 'Account Title',
  customerid: '12345',
  acctstatus: 'Active',
  accountnumber: '1234567890',
  branch: 'Main Branch',
  bkbal: '50000.00',
  effbal: '45000.00',
  usebal: '40000.00',
  source: 'Internal Funds'
};

const mockProductDetails: IProductDetails = {
  productCode: '',
  productName: '',
  productclass: '',
  appType: '',
  productstart: '',
  productExpire: '',
  currencycode: '',
  term: '',
  repayoption: '',
  repayoption2: '',
  schtype: '',
  minintrate: '',
  maxintrate: '',
  minterm: 0,
  maxterm: 0,
  minloan: 0,
  maxloan: 0,
  collval: '',
  schedcalc: '',
  princbalBalance: '',
  interestReceivable: '',
  interestincome: '',
  susinterest: '',
  susprinc: '',
  micincome: '',
  intaccrual: '',
  uid: '',
  interbr: '',
  penalIntIncome: '',
  penalIntAccrual: '',
  penalSuspense: '',
  penalrate: 0,
  actualRAte: 0,
  shortname: '',
  loantype: 0,
  loanclass: 0,
  postnodebit: '',
  allowOD: 0,
  manageCollection: 0,
  actualRateCalcMethod: '',
  penalrateCalcMethod: 0,
  moratorium: '',
  moratoriumtype: '',
  intRateCode: '',
  chkHealthInsurance: 0,
  healthInsuranceAcct: '',
  healthInsuranceAmt: 0,
  userid: ''
};
describe('ViewLoan Component', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('?accountNumber=1234567890&action=view')
    );
    (useGetLoanAccountDetails as jest.Mock).mockReturnValue({
      loanAccDetails: mockLoanAccDetails,
      isLoading: false
    });
    (useGetAccountDetails as jest.Mock).mockReturnValue({
      accDetailsResults: mockCustomerDetails,
      isLoading: false
    });
  });

  test(' Should render loading skeleton when data is being fetched', () => {
    (useGetLoanAccountDetails as jest.Mock).mockReturnValue({
      loanAccDetails: null,
      isLoading: true
    });

    (useGetLoansProductDetailCode as jest.Mock).mockReturnValue({
      loanProducts: null,
      isLoading: true
    });
    renderComponentWithQueryProvider(<ViewLoan />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

describe('LoanDetails Component', () => {
  test('Should expand/collapse accordion on click', () => {
    renderComponentWithQueryProvider(
      <LoanDetails
        loanAccDetails={mockLoanAccDetails}
        customerDetails={mockCustomerDetails}
        loanProducts={mockProductDetails}
      />
    );

    const expandButton = screen.getByText(/Click to view more details/i);
    fireEvent.click(expandButton);

    // Check if content is expanded
    expect(screen.getByText('Account Details')).toBeInTheDocument();
  });

  test('Should render status badge correctly', () => {
    renderComponentWithQueryProvider(
      <LoanDetails
        loanAccDetails={mockLoanAccDetails}
        customerDetails={mockCustomerDetails}
        loanProducts={mockProductDetails}
      />
    );

    const statusBadges = screen.getAllByText('Active');
    expect(statusBadges[0]).toBeInTheDocument();

    const statusSection = screen.getByText('Status').parentElement;
    const statusBadge = statusSection?.querySelector(
      'div[style*="background-color"]'
    );
    expect(statusBadge).toBeInTheDocument();
  });

  test('Should render external link buttons for accounts', () => {
    renderComponentWithQueryProvider(
      <LoanDetails
        loanAccDetails={mockLoanAccDetails}
        customerDetails={mockCustomerDetails}
        loanProducts={mockProductDetails}
      />
    );

    const externalLinks = screen.getAllByRole('button');
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  test(' Should handle missing or N/A values gracefully', () => {
    const incompleteDetails: Partial<ILoanAccountDetails> = {
      ...mockLoanAccDetails,
      fullName: undefined,
      customerID: undefined
    };

    renderComponentWithQueryProvider(
      <LoanDetails
        loanAccDetails={incompleteDetails as ILoanAccountDetails}
        customerDetails={mockCustomerDetails}
        loanProducts={mockProductDetails}
      />
    );

    const naValues = screen.getAllByText('N/A');
    expect(naValues.length).toBeGreaterThan(0);
  });
});
