import express, { Express } from "express";
import items from "./modules/items/items";
import config from "./config";

const app: Express = express();

app.use("/api/items", items);

if (process.env.NODE_ENV !== "test") {
  app.listen(config.app.port, () => {
    console.log(
      `[server]: Server is running at http://localhost:${config.app.port}`
    );
  });
}

export default app;
