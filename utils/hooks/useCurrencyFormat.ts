export const formatCurrency = (amount: any) => {
  if (!amount) {
    return '0.00';
  }

  const formattedAmount = parseFloat(amount).toFixed(2);
  return `${parseFloat(formattedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
