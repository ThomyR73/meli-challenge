import { render, screen } from "@testing-library/react";
import Id from "./page";
import { itemMockData } from "@/utils/testMockUps";

describe("Id", () => {
  beforeEach(() => {
    fetch = jest.fn().mockResolvedValue({
      json: async () => Promise.resolve({ ...itemMockData }),
      ok: true,
    });
  });

  test("renderiza correctamente los datos del producto", async () => {
    render(await Id({ params: "123" }));
    expect(
      await screen.getAllByText(itemMockData.item.title)[0]
    ).toBeInTheDocument();
  });

  test("muestra la condición y cantidad vendida", async () => {
    render(await Id({ params: "123" }));
    expect(
      await screen.getAllByText(
        `${itemMockData.item.condition === "new" ? "Nuevo" : "Usado"} | ${
          itemMockData.item.sold_quantity
        } vendidos`
      )[0]
    ).toBeInTheDocument();
  });

  test("muestra 'Llega gratis' si el envío es gratuito", async () => {
    itemMockData.item.free_shipping = true;
    render(await Id({ params: "123" }));
    expect(await screen.findByText("Llega gratis")).toBeInTheDocument();
  });

  test("muestra 'No hay resultados' si el producto no tiene id", async () => {
    itemMockData.item.id = "";
    render(await Id({ params: "123" }));
    expect(await screen.findByText("No hay resultados")).toBeInTheDocument();
  });

  test("muestra 'Algo salió mal' cuando la API devuelve un error", async () => {
    fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    render(await Id({ params: "123" }));
    expect(await screen.findByText("Algo salio mal")).toBeInTheDocument();
  });
});
