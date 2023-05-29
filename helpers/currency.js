export default function getCurrencySign(currency) {
  if (currency === "GEL") return "₾";
  else if (currency === "USD") return "$";
  else return "€";
}
