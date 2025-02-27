import ItemCard from "@/components/ItemCard";
import { ListItemType, ResultsType } from "@/types/types";
import styles from "./Items.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ResolvingMetadata } from "next";
import ErrorComponent from "@/components/ErrorComponent";

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ search: string }> },
  parent: ResolvingMetadata
) {
  const { search } = await searchParams;
  const parentData = await parent;
  return {
    ...parentData,
    title: `${search} | Mercado Libre`,
    openGraph: {
      ...parentData.openGraph,
      title: `${search} | Mercado Libre`,
      url: `${process.env.WEB_URL}/items?search=${search}`,
    },
    twitter: {
      ...parentData.twitter,
      title: `${search} | Mercado Libre`,
    },
  };
}

export default async function Items({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  try {
    const params = new URLSearchParams(await searchParams);
    const res = await fetch(
      `${process.env.API_URL}/api/items?${params.toString()}`
    );
    const results: ResultsType = await res.json();

    if (!res.ok) return <ErrorComponent message="Algo salio mal" />;

    return (
      <section className={styles.section}>
        {results.categories.length > 0 && (
          <Breadcrumbs categories={results.categories} />
        )}
        {results.items.length > 0 ? (
          results.items.map((item: ListItemType) => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <ErrorComponent message="No hay resultados para tu busqueda" />
        )}
      </section>
    );
  } catch (e) {
    console.error(e);
    return <ErrorComponent message="Algo salio mal" />;
  }
}
