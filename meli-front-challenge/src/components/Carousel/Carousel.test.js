import { render, screen } from "@testing-library/react";
import Carousel from ".";
import "@testing-library/jest-dom";
import { act } from "react";

jest.useFakeTimers();

describe("Carousel", () => {
  it("debería renderizar correctamente las imágenes", () => {
    render(<Carousel />);

    expect(
      screen.getByAltText("Full Week ¡Ofertas que llegan volando!")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Días gamer hasta 30% off")).toBeInTheDocument();
  });

  test("cambia de imagen automáticamente", () => {
    render(<Carousel />);

    const container = screen.getAllByTestId("container")[0];
    expect(container).toHaveStyle("transform: translate(-0%)");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(container).toHaveStyle("transform: translate(-100%)");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(container).toHaveStyle("transform: translate(-200%)");
  });
});
