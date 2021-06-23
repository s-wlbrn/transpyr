export const formatPriceUSD = (price) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
