import { ListItemType } from "@/types/types";
import styles from "./ItemCard.module.scss";
import Link from "next/link";

export default function ItemCard({ item }: { item: ListItemType }) {
  return (
    <Link href={`/items/${item.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.image}>
          <img src={item.picture} alt={item.title} />
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.price}>
            {item.price.amount.toLocaleString("es-ar", {
              style: "currency",
              currency: item.price.currency_id,
            })}
          </p>
          {item.free_shipping && (
            <span className={styles.shipping}>Envío gratis</span>
          )}
          {item.condition !== "new" && (
            <span className={styles.condition}>Usado</span>
          )}
        </div>
      </article>
    </Link>
  );
}
