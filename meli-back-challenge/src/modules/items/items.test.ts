import request from "supertest";
import app from "../../app";

global.fetch = jest.fn() as jest.Mock;

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/items", () => {
    it("Debe devolver una lista de ítems cuando hay resultados", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              id: "123",
              title: "Test Item",
              price: 100,
              sale_price: { amount: 100, currency_id: "ARS" },
              thumbnail: "test.jpg",
              condition: "new",
              shipping: { free_shipping: true },
            },
          ],
          filters: [
            {
              id: "category",
              values: [{ path_from_root: [{ name: "Category" }] }],
            },
          ],
        }),
      });

      const response = await request(app).get("/api/items?search=test");
      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.categories).toContain("Category");
    });

    it("Debe devolver un array vacío cuando no hay resultados", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ results: [], filters: [] }),
      });

      const response = await request(app).get("/api/items?search=test");
      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(0);
    });

    it("Debe manejar errores en la API externa", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      const response = await request(app).get("/api/items?search=test");
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error al obtener los datos");
    });
  });

  describe("GET /api/items/:id", () => {
    it("Debe devolver un ítem con los datos correctos", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          id: "123",
          title: "Test Item",
          price: 100,
          currency_id: "ARS",
          pictures: [{ url: "test.jpg" }],
          condition: "new",
          shipping: { free_shipping: true },
          initial_quantity: 10,
        }),
      });
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ plain_text: "Test Description" }),
      });

      const response = await request(app).get("/api/items/123");
      expect(response.status).toBe(200);
      expect(response.body.item.id).toBe("123");
      expect(response.body.item.description).toBe("Test Description");
    });

    it("Debe manejar errores en la API externa", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      const response = await request(app).get("/api/items/123");
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error al obtener los datos");
    });
  });
});
