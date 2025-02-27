"use client";
import { FormEvent, useCallback, useState } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.scss";
import MagnifyingGlass from "../Icons/MagnifyingGlass";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (search.length === 0) return;
      const params = new URLSearchParams();
      params.set("search", search);
      router.push(`/items?${params.toString()}`);
    },
    [search, router]
  );

  return (
    <nav className={styles.navBar}>
      <div className={styles.wrapper}>
        <Link href={"/"} className={styles.logo}>
          <img
            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.111/mercadolibre/logo__small_25years.png"
            alt="MercadoLibre"
          />
        </Link>
        <form
          action="/items"
          className={styles.searchBar}
          onSubmit={(e: FormEvent) => handleSubmit(e)}
        >
          <input
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className={styles.searchInput}
            placeholder="Buscar productos, marcas y más..."
          />
          <span className={styles.divider}></span>
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Buscar"
          >
            <MagnifyingGlass />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;
