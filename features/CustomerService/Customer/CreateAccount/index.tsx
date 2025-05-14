'use client';
import { CreateAccount } from '@/features/CustomerService/Form/CreateAccount';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllCustomerAccountProducts } from '@/api/customer-service/useCustomer';

export const CreateAccountContainer = () => {
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllCustomerAccountProducts();

  return (
    branches &&
    bankproducts && (
      <CreateAccount branches={branches} bankproducts={bankproducts} />
    )
  );
};
