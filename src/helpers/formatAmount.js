export default (amount) => {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(amount);
};
