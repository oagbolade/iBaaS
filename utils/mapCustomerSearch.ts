import { ICustomers, IUsers } from '@/api/ResponseTypes/customer-service';

interface Customer {
  custID: string;
  acctTitle: string;
  accountNumber: string;
  phone: string;

  // new update key due to new build
  accounttitle: string;
  customerid: string;
  accountnumber: string;
}

interface Staff {
  userid: string;
  fullname: string;
  phone: string;
}

export const mapCustomerSearch = (
  customers: ICustomers[] | undefined
): { value: string; name: string; phone: string }[] => {
  return (
    (customers as unknown as Customer[])?.map((customer: Customer) => ({
      value: customer.customerid.toString(),
      name: customer.accounttitle,
      phone: customer.phone
    })) || []
  );
};

export const mapCustomerAccountNumberSearch = (
  accountDetailsResults: ICustomers[] | undefined
): { value: string; name: string }[] => {
  return (
    (accountDetailsResults as unknown as Customer[])?.map(
      (customer: Customer) => ({
        value: customer?.accountnumber?.toString(),
        name: customer.accounttitle
      })
    ) || []
  );
};

export const mapStaffSearch = (
  staff: IUsers[] | undefined
): { value: string; name: string; phone: string }[] => {
  return (
    (staff as unknown as Staff[])?.map((eachStaff: Staff) => ({
      value: eachStaff.userid.toString(),
      name: eachStaff.fullname,
      phone: eachStaff.phone
    })) || []
  );
};

export const mapCustomerSearchLoan = (customers: ICustomers[]) => {
  return (
    customers.map((customer: ICustomers) => ({
      customer
    })) || []
  );
};
