import { render, screen } from "@testing-library/react";
import Items from "./page";
import { searchMockData } from "@/utils/testMockUps";

describe("Items", () => {
  beforeEach(() => {});

  test("renderiza correctamente la sección con resultados", async () => {
    fetch = jest.fn().mockResolvedValue({
      json: async () => Promise.resolve({ ...searchMockData }),
      ok: true,
    });

    render(await Items({ searchParams: "iPhone" }));
    expect(
      await screen.findByText(searchMockData.items[0].title)
    ).toBeInTheDocument();
  });

  test("muestra Breadcrumbs solo si hay categorías", async () => {
    fetch = jest.fn().mockResolvedValue({
      json: async () => Promise.resolve({ ...searchMockData }),
      ok: true,
    });

    render(await Items({ searchParams: "iPhone" }));
    expect(
      await screen.findByText("Celulares y Telefones")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Celulares y Smartphones")
    ).toBeInTheDocument();
  });

  test("maneja correctamente el caso sin resultados", async () => {
    fetch = jest.fn().mockResolvedValue({
      json: async () => Promise.resolve({ categories: [], items: [] }),
      ok: true,
    });

    render(await Items({ searchParams: "iPhone" }));
    expect(await screen.findByText("No hay resultados")).toBeInTheDocument();
  });

  test("maneja errores de la API", async () => {
    fetch = jest.fn().mockResolvedValue({
      json: async () => Promise.resolve({}),
      ok: false,
    });

    render(await Items({ searchParams: "iPhone" }));

    expect(await screen.findByText("Algo salio mal")).toBeInTheDocument();
  });
});
