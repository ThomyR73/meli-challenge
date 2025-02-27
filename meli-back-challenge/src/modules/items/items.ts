import express, { Request, Response } from "express";
import {
  ItemsDataType,
  ItemsResponseType,
  ItemDataType,
  DescriptionDataType,
  ItemResponseType,
} from "../../types/types";
import priceParser from "../../services/priceParser";

const router = express.Router();

router.get("/", async function (req: Request, res: Response): Promise<void> {
  try {
    const data = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.search}&limit=4`
    );
    const originalData: ItemsDataType = await data.json();

    const response: ItemsResponseType = {
      author: {
        name: "Thomas",
        lastname: "Romano",
      },
      items: [],
      categories: [],
    };

    if (originalData.results.length > 0) {
      response.items = originalData.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: priceParser(
            item.original_price || item.price,
            item.sale_price.currency_id
          ),
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        };
      });
    } else {
      response.items = [];
    }

    const categories = originalData.filters.find(
      (filter) => filter.id === "category"
    );
    if (categories) {
      response.categories = categories.values[0].path_from_root.map(
        (value) => value.name
      );
    } else {
      response.categories = [];
    }

    res.status(200).send({ ...response });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los datos" });
  }
});

router.get("/:id", async function (req: Request, res: Response): Promise<void> {
  try {
    const itemFetch = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const descriptionFetch = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );
    const itemData: ItemDataType = await itemFetch.json();
    const descriptionData: DescriptionDataType = await descriptionFetch.json();

    const response: ItemResponseType = {
      author: {
        name: "Thomas",
        lastname: "Romano",
      },
      item: {},
    };
    if (!itemData.error) {
      response.item = {
        id: itemData.id,
        title: itemData.title,
        price: priceParser(itemData.price, itemData.currency_id),
        picture: itemData.pictures[0].url,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.initial_quantity,
        description: descriptionData.plain_text || "",
      };
    }
    res.status(200).send({ ...response });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los datos" });
  }
});

export default router;
