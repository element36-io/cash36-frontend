export const formatAmount = amount => {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
    amount
  );
};

export const parseAmount = amount => amount.replace(/,/g, '.');

export const formatSymbolToCurrency = symbol => symbol.substring(0, 3);
