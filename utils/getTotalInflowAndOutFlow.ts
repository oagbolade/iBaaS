type Transaction = {
  accountnumber: string;
  accounttitle: string;
  productcode: string;
  productName: string;
  branchcode: string;
  inflow: number;
  outflow: number;
};

export const calculateTotalInflowAndOutflow = (transactions: Transaction[]) => {
  return transactions.reduce(
    (totals, transaction) => {
      return {
        totalInflow: totals.totalInflow + transaction.inflow,
        totalOutflow: totals.totalOutflow + transaction.outflow
      };
    },
    { totalInflow: 0, totalOutflow: 0 }
  );
};
