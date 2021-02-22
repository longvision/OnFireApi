const packagePriceImGramOrML = (unit, package_size, package_price) => {
  switch (unit) {
    case "KG":
      return unitPrice(package_size, package_price) / 1000;
    case "g":
      return unitPrice(package_size, package_price);
    case "L":
      return unitPrice(package_size, package_price) / 1000;
    case "mL":
      return unitPrice(package_size, package_price);
    default:
      break;
  }
};
const convertToGramOrML = (unit, quantity) => {
  switch (unit) {
    case "KG":
      return quantity * 1000;
    case "g":
      return true;
    case "L":
      return quantity * 1000;
    case "mL":
      return quantity;
    default:
      break;
  }
};
const checkUnitCombination = (ingredient_unit, measure_unit) => {
  switch (measure_unit) {
    case "KG":
      if (ingredient_unit === "KG" || ingredient_unit === "g") return true;
      break;
    case "g":
      if (ingredient_unit === "KG" || ingredient_unit === "g") return true;
      break;
    case "L":
      if (ingredient_unit === "L" || ingredient_unit === "mL") return true;
      break;
    case "mL":
      if (ingredient_unit === "L" || ingredient_unit === "mL") return true;
      break;
    default:
      return false;
  }
};
const unitPrice = (size, price) => {
  const pk_size = size * 100000;
  const pk_price = price * 100000;

  return pk_price / pk_size;
};

module.exports = {
  convertToGramOrML,
  checkUnitCombination,
  unitPrice,
  packagePriceImGramOrML,
};
