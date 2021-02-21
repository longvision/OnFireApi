const packageGramPrice = (unit, package_size, package_price) => {
  switch (unit) {
    case "KG":
      return unitPrice(package_size, package_price) / 1000;
    case "g":
      return unitPrice(package_size, package_price);
    default:
      break;
  }
};
const convertToGram = (unit, quantity) => {
  switch (unit) {
    case "KG":
      return quantity * 1000;
    case "g":
      return quantity;
    default:
      break;
  }
};
const unitPrice = (size, price) => {
  const pk_size = size * 100000;
  const pk_price = price * 100000;

  return pk_price / pk_size;
};

module.exports = { packageGramPrice, unitPrice, convertToGram };
