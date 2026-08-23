export const formatAmountForStripe = (amount: number, currency: string) => {
  let formattedAmount = amount;
  if (currency === "usd") {
    formattedAmount = amount * 100; // Convert to cents
  }
  return Math.round(formattedAmount);
};
