import * as Yup from 'yup';
import { numericRegex, phoneRegExp, stringRegex } from '../admin';

export const batchPosting = Yup.object({
  chequeno: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Cheque Number is  Required'),
  currency: Yup.string().required('Currency is Required'),
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  trancode: Yup.string().required('Transfer code is Required'),
  tellerno: Yup.string()
    .required('Teller Number is  Required')
    .matches(numericRegex, 'Input must be a number'),
  valueDate: Yup.string().required('Value date is Required')
});

export const cashDepositSchema = Yup.object({
  transAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  rate: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required(' Rate is Required'),
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  depositorName: Yup.string()
    .matches(stringRegex, 'Invalid Depositor Name')
    .required('Depositor Name   is Required'),
  currencyCode: Yup.string().required('Currency Code is Required'),
  tellerno: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Teller number is Required')
});

export const chargeConcession = Yup.object({
  amount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Amount is Required')
});
export const chequeDeposit = Yup.object({
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  tellerno: Yup.string()
    .required('Teller number is Required')
    .matches(numericRegex, 'Input must be a number'),
  transAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  cheqNumber: Yup.string()
    .required('Cheques number is Required')
    .matches(numericRegex, 'Input must be a number')
});
export const chequeWithdraw = Yup.object({
  currencyCode: Yup.string().required('currency Code is Required'),
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  tellerno: Yup.string()
    .required('Teller Number is Required')
    .matches(numericRegex, 'Input must be a number'),
  transAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction Amount is Required')
});

export const returnCheque = Yup.object({
  chequeNumber: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Cheque Number is  Required'),
  payAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Pay Amount is Required'),
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  currencycode: Yup.string().required('Currency Code is required')
});
export const inwardClearing = Yup.object({
  currencyCode: Yup.string().required('currency Code is Required'),
  narration1: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  tranamount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction Amount is Required'),
  bankcode: Yup.string().required(' Bank Code is Required'),
  cleartype: Yup.string().required(' Clearing Type is Required'),
  chkNum: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('check number is  Required')
});
export const outwardClearing = Yup.object({
  currencyCode: Yup.string().required('currency Code is Required'),
  narration1: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  tranamount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction Amount is Required'),
  bankcode: Yup.string().required(' Bank Code is Required'),
  cleartype: Yup.string().required(' Clearing Type is Required'),
  chkNum: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('check number is  Required'),
  chequetype: Yup.string().required(' Cheque Type is Required')
});
export const NipTransferSchema = Yup.object({
  currencyCode: Yup.string().required('Currency Code is Required'),
  cleartype: Yup.string().required('clear Type is Required'),
  reversal: Yup.string().required('Reversal is Required'),
  valuedate: Yup.string().required('Value date is Required'),
  tranamount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction amount is Required'),
  crossrate: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required(' Rate is Required'),
  tellerno: Yup.string()
    .required('Teller Number is Required')
    .matches(numericRegex, 'Input must be a number'),
  narration1: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required')
});
export const cashWithdrawalSchema = Yup.object({
  transAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction Amount is Required'),
  narration: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  currencyCode: Yup.string().required('Currency Code is Required'),
  tellerno: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Voucher Number is  Required'),
  rate: Yup.string().required('Rate is Required')
});
export const FundTransferSchema = Yup.object({
  transfertype: Yup.string().required('Trnasfer Type is Required'),
  reversal: Yup.string().required('Reversal is Required'),
  valuedate: Yup.string().required('Value Date is Required'),
  currencyCode: Yup.string().required('currency Code is Required'),
  tranamount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction Amount is Required'),
  crossrate: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Cross Rate is Required'),
  tellerno: Yup.string()
    .required('Teller number is Required')
    .matches(numericRegex, 'Input must be a number'),
  narration1: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required')
});
export const cashJournalSchema = Yup.object({
  tranamount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Transaction amount is Required'),
  valuedate: Yup.string().required('Value date is Required'),
  narration1: Yup.string()
    .matches(stringRegex, 'Invalid Narration')
    .required('Narration   is Required'),
  currencyCode: Yup.string().required('Currency Code is Required'),
  chequetype: Yup.string().required('Transaction Type is Required'),
  debitAcct: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('debit account is  Required')
});

export const valutManagementSchema = Yup.object({
  telleraccno: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Amount must not be less than 0'),
  tranAmount: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Amount must not be less than 0')
    .required('Required'),
  narration: Yup.string()
    .max(50, 'Narration must be at most 50 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Narration must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
});
