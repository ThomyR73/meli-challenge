import priceParser from "../../services/priceParser";
import { PriceType } from "../../types/types";

describe("priceParser", () => {
  it("Debe devolver amount con el mismo valor y decimals en 0 si el precio es entero", () => {
    const result: PriceType = priceParser(100, "ARS");
    expect(result).toEqual({ amount: 100, currency_id: "ARS", decimals: 0 });
  });

  it("Debe extraer correctamente los decimales cuando el precio tiene decimales", () => {
    const result: PriceType = priceParser(99.99, "USD");
    expect(result).toEqual({ amount: 99.99, currency_id: "USD", decimals: 99 });
  });

  it("Debe manejar correctamente precios con ceros a la derecha en los decimales", () => {
    const result: PriceType = priceParser(10.5, "EUR");
    expect(result).toEqual({ amount: 10.5, currency_id: "EUR", decimals: 50 });
  });

  it("Debe devolver amount 0 y decimals 0 si el precio es 0", () => {
    const result: PriceType = priceParser(0, "ARS");
    expect(result).toEqual({ amount: 0, currency_id: "ARS", decimals: 0 });
  });

  it("Debe manejar correctamente valores con una sola posición decimal", () => {
    const result: PriceType = priceParser(5.1, "USD");
    expect(result).toEqual({ amount: 5.1, currency_id: "USD", decimals: 10 });
  });
});
