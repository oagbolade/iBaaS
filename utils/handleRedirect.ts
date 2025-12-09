// import DOMPurify from 'dompurify';
import DOMPurify from 'dompurify';

const whitelist = [
 "/admin/account-officers",
 "/customer-service/officer-transfer",
 "/dashboard",
 "/admin/users",
 "/finance/general-ledger",
 "/admin/gl-account",
 "/admin/posting-limit",
 "/admin/roles/",
 "/finance/account/",
 "/customer-service/customer/",
 "/customer-service/group/",
 "/customer-service/director/",
 "/requests/",
 "/loan/loan-directory/",
 "/loan/overdrafts/",
 "/operation/cash/",
 "/operation/cheque/",
 "/operation/createEndofday/",
 "/operation/endOfDay/",
 "/operation/transfer/",
 "/operation/management/",
 "/setup/product-gl/charge/",
 "/setup/operations/cheque-book/",
 "/setup/operations/clearing-banks/",
 "/setup/operations/commercial_bank/",
 "/setup/company/",
 "/setup/company/country/",
 "/setup/company/holidays/",
 "/setup/company/region/",
 "/setup/company/state-management/",
 "/setup/company/department/",
 "/setup/kyc/document/",
 "/setup/operations/dormancy-criteria/",
 "/setup/kyc/education/",
 "/setup/product-gl/exception/",
 "/setup/product-gl/product-class/",
 "/setup/kyc/group/",
 "/setup/kyc/industry/",
 "/setup/product-gl/interest/",
 "/setup/product-gl/product-setup/",
 "/setup/kyc/profession/",
 "/setup/company/town/",
 "/setup/kyc/relationship/",
 "/setup/kyc/sector/",
 "/setup/company/branch/",
 "/setup/product-gl/setup-condition/",
 "/setup/operations/transaction-type/",
 "/setup/kyc/zone-setup/",
 "/admin/users/password/",
 "/loan/loan-directory/",
 "/loan/overdrafts/",

]

export const handleRedirect = (router: any, link: string = '') => {
  if (!link) return;
   const isWhitelisted = whitelist.some(path => link.startsWith(path));
  if (!isWhitelisted) return
  return router.push(DOMPurify.sanitize(link));
};
