import { PriceType } from "../../types/types";

const priceParser = (price: number, currencyId: string): PriceType => {
  const formatedPrice: PriceType = {
    amount: price,
    currency_id: currencyId,
    decimals: 0,
  };

  if (!Number.isInteger(price)) {
    const numberToString = price.toFixed(2);
    formatedPrice.decimals = parseInt(numberToString.split(".")[1]);
  }
  return formatedPrice;
};

export default priceParser;
