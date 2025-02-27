import { CategoriesType } from "@/types/types";
import styles from "./Breadcrumbs.module.scss";
import ChevronRight from "../Icons/ChevronRight";

export default function Breadcrumbs({
  categories,
}: {
  categories: CategoriesType;
}) {
  return (
    <ol className={styles.breadcrumbs}>
      {categories.map((category: string) => (
        <li key={category}>
          {category}
          <span>
            <ChevronRight />
          </span>
        </li>
      ))}
    </ol>
  );
}
