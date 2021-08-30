const useCurrencyFormatter = (currSymbol, amount) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currSymbol,
  }).format(amount);
};

export default useCurrencyFormatter;
