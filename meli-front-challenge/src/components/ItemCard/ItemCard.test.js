import { render, screen } from "@testing-library/react";
import ItemCard from "../ItemCard";
import { useRouter } from "next/router";
import { searchMockData } from "@/utils/testMockUps";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ItemCard", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      pathname: "/",
      query: {},
      asPath: "/",
    });
  });

  test("renderiza correctamente el título del producto", async () => {
    render(<ItemCard item={searchMockData.items[0]} />);
    expect(
      await screen.findByText(searchMockData.items[0].title)
    ).toBeInTheDocument();
  });

  test("el enlace redirige a la página correcta", async () => {
    render(<ItemCard item={searchMockData.items[0]} />);
    expect(await screen.findByRole("link")).toHaveAttribute(
      "href",
      `/items/${searchMockData.items[0].id}`
    );
  });

  test("muestra la imagen con el alt correcto", async () => {
    render(<ItemCard item={searchMockData.items[0]} />);
    const img = await screen.findByRole("img");
    expect(img).toHaveAttribute("src", searchMockData.items[0].picture);
    expect(img).toHaveAttribute("alt", searchMockData.items[0].title);
  });

  test("formatea correctamente el precio en pesos argentinos", async () => {
    render(<ItemCard item={searchMockData.items[0]} />);
    expect(
      await screen.findByText((content) => content.includes("$ 2.159.999,00"))
    ).toBeInTheDocument();
  });

  test("muestra 'Envío gratis' si el envío es gratuito", async () => {
    render(<ItemCard item={searchMockData.items[0]} />);
    expect(await screen.findByText("Envío gratis")).toBeInTheDocument();
  });

  test("muestra 'Usado' si la condición no es 'new'", async () => {
    searchMockData.items[0].condition = "used";
    render(<ItemCard item={searchMockData.items[0]} />);
    expect(await screen.findByText("Usado")).toBeInTheDocument();
  });
});
