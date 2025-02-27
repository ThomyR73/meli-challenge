"use client";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";

const staticData = [
  {
    src: "/images/promos/promo1.webp",
    title: "Full Week ¡Ofertas que llegan volando!",
  },
  { src: "/images/promos/promo2.webp", title: "Días gamer hasta 30% off" },
  {
    src: "/images/promos/promo3.webp",
    title: "Jueves de moda liquidación final",
  },
  {
    src: "/images/promos/promo4.webp",
    title: "Especial Construcción hasta 40% off",
  },
  { src: "/images/promos/promo5.webp", title: "Vuelta a clases hasta 35% off" },
  {
    src: "/images/promos/promo6.webp",
    title: "¡Aprovecha ahora! Hasta 18 cuotas sin interés",
  },
  {
    src: "/images/promos/promo7.webp",
    title: "Nivel 6 suscribite disfrutá Oscars y mucho más",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const infinteScroll = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === staticData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(infinteScroll);
    };
  }, []);

  return (
    <div className={styles.container}  >
      {staticData.map((item) => (
        <div
          className={styles.item}
          style={{ transform: `translate(-${index * 100}%)` }}
          key={item.src}
          data-testid="container"
        >
          <img src={item.src} alt={item.title} />
        </div>
      ))}
    </div>
  );
}
