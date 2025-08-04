export const formatCurrency = (amount: any) => {
  const num = parseFloat(amount);

  if (Number.isNaN(num) || num === 0) {
    return '0.00';
  }

  const formattedAmount = parseFloat(amount).toFixed(2);
  return `${parseFloat(formattedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
