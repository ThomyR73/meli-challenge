import { ItemDataType } from "@/types/types";
import styles from "./Id.module.scss";
import { ResolvedMetadata } from "next";
import ErrorComponent from "@/components/ErrorComponent";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvedMetadata
) {
  try {
    const paramsResult = await params;
    const res = await fetch(
      `${process.env.API_URL}/api/items/${paramsResult.id}`
    );
    const itemData: ItemDataType = await res.json();

    if (!res.ok) return await parent;

    return {
      title: `${itemData.item.title} | Mercado Libre`,
      description: itemData.item.title,
      openGraph: {
        title: `${itemData.item.title} | Mercado Libre`,
        description: itemData.item.description,
        images: itemData.item.picture,
        url: `${process.env.WEB_URL}/items/${itemData.item.id}`,
      },
      twitter: {
        title: `${itemData.item.title} | Mercado Libre`,
        description: itemData.item.description,
        images: itemData.item.picture,
      },
    };
  } catch (e) {
    console.log(e);
    return await parent;
  }
}

export default async function Id({
  params,
}: {
  params: Promise<{ id: "string" }>;
}) {
  try {
    const paramsResult = await params;
    const res = await fetch(
      `${process.env.API_URL}/api/items/${paramsResult.id}`
    );
    const itemData: ItemDataType = await res.json();

    if (!res.ok) return <ErrorComponent message="Algo salio mal" />;

    return (
      <div>
        {itemData.item.id ? (
          <article className={styles.product}>
            <div className={styles.image}>
              <span className={styles.conditionAndSold}>
                {itemData.item.condition === "new" ? "Nuevo " : "Usado "}|
                {` ${itemData.item.sold_quantity} vendidos`}
              </span>
              <h1 className={styles.title}>{itemData.item.title}</h1>
              <img src={itemData.item.picture} alt={itemData.item.title} />
            </div>
            <div className={styles.dataContainer}>
              <span className={styles.conditionAndSold}>
                {itemData.item.condition === "new" ? "Nuevo " : "Usado "}|
                {` ${itemData.item.sold_quantity} vendidos`}
              </span>
              <h1 className={styles.title}>{itemData.item.title}</h1>
              <p className={styles.price}>
                {itemData.item.price.amount.toLocaleString("es-ar", {
                  style: "currency",
                  currency: itemData.item.price.currency_id,
                })}
              </p>
              {itemData.item.free_shipping && (
                <span className={styles.shipping}>Llega gratis</span>
              )}
              <button className={styles.buyButton}>Comprar ahora</button>
            </div>
            <p className={styles.description}>{itemData.item.description}</p>
          </article>
        ) : (
          <ErrorComponent message="No pudimos encontrar lo que estas buscando." />
        )}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <ErrorComponent message="Algo salio mal" />;
  }
}
