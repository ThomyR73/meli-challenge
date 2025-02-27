import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchBar", () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
  });

  test("Renderiza correctamente el input y botón de búsqueda", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Buscar productos, marcas y más...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  test("Cambia el estado al escribir en el input", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Buscar productos, marcas y más..."
    );
    fireEvent.change(input, { target: { value: "iPhone" } });
    expect(input.value).toBe("iPhone");
  });

  test("Envía el formulario y navega a la URL esperada", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Buscar productos, marcas y más..."
    );
    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.change(input, { target: { value: "iPhone" } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/items?search=iPhone");
  });

  test("No hace nada si el input está vacío", () => {
    render(<SearchBar />);
    const button = screen.getByRole("button", { name: "Buscar" });
    fireEvent.click(button);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
