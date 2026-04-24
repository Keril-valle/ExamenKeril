import { useEffect, useState } from "react";
import type { CarPart } from "../types/CarPart";
import CardCars from "./CardCars";
const xAccessKey =import.meta.env["VITE_X-Access-Key"] ?? import.meta.env.VITE_X_ACCESS_KEY;



const PAGE_SIZE = 10;

const normalizeArticles = (data: unknown): CarPart[] => {
  const record = (data as { record?: unknown })?.record;

  if (!record || typeof record !== "object") {
    return [];
  }

  const articles = (record as { articles?: unknown }).articles;
  return Array.isArray(articles) ? (articles as CarPart[]) : [];
};

const CarsParst = () => {
  const [jsonBIN, setJsonBIN] = useState<CarPart[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);


  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69e535e236566621a8ce210a", {
      headers: {
        "X-Access-Key": xAccessKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`JSONBin respondió con ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const articles = normalizeArticles(data);
        setJsonBIN(articles);
        setVisibleCount(PAGE_SIZE);
      })
      .catch(() => {
        setJsonBIN([]);
      });
  }, []);

  const currentStart = Math.max(0, visibleCount - PAGE_SIZE);
  const visibleItems = jsonBIN.slice(currentStart, visibleCount);
  const canShowMore = jsonBIN.length > PAGE_SIZE && visibleCount < jsonBIN.length;
const showLess = jsonBIN.length > PAGE_SIZE && visibleCount < jsonBIN.length;

  return (
    <div className="cars-page">
      <h1>Repuestos de Carro</h1>
      
      <div className="products-grid">
        {visibleItems.map((product) => (
          <CardCars key={product.articleId} card={product} />
        ))}
      </div>
{showLess && (
        <button onClick={() => setVisibleCount((prev) => Math.max(PAGE_SIZE, prev - PAGE_SIZE))}>
          ver menos
        </button>
      )}
      {canShowMore && (
        <button onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}>
          ver más
        </button>
      )}
      
    </div>
  );
};

export default CarsParst;
