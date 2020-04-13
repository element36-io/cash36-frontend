export const formatAmount = amount => {
  if (isNaN(amount)) {
    amount=Number.parseFloat(amount)
  }

  var userLang = navigator.language || navigator.userLanguage;
  if (!userLang || userLang==="") {
    userLang="de-DE"
  }
  return new Intl.NumberFormat(userLang, { minimumFractionDigits: 2 }).format(amount );
};

export const parseAmount = amount => amount.replace(/,/g, '.');

export const formatSymbolToCurrency = symbol => symbol.substring(0, 3);
