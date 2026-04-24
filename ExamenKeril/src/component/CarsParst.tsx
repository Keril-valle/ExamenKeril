import { useEffect, useState } from "react";
import type { CarPart } from "../types/CarPart";
import CardCars from "./CardCars";
import BuscarCars from "./BuscarCars";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jsonBIN, setJsonBIN] = useState<CarPart[]>([]);
  const [searchResults, setSearchResults] = useState<CarPart[] | null>(null);
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
        setSearchResults(null);
        setVisibleCount(PAGE_SIZE);
        setError(null);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "No se pudieron cargar los repuestos.";
        setError(message);
        setJsonBIN([]);
        setIsLoading(false);
      });
  }, []);

  const currentStart = Math.max(0, visibleCount - PAGE_SIZE);
  const visibleItems = jsonBIN.slice(currentStart, visibleCount);
  const itemsToRender = searchResults ?? visibleItems;
  const isSearchMode = searchResults !== null;
  const canShowMore = jsonBIN.length > PAGE_SIZE && visibleCount < jsonBIN.length;
  const showLess = visibleCount > PAGE_SIZE;

  if (isLoading) {
    return <p>Cargando repuestos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (jsonBIN.length === 0) {
    return <p>No hay repuestos disponibles.</p>;
  }

  return (
    <div className="cars-page">
      <h1>Repuestos de Carro</h1>
      <BuscarCars items={jsonBIN} onSearch={setSearchResults} />
     <br /> <br /> <br /> <br />
      
      <div className="products-grid">
        {itemsToRender.map((product) => (
          <CardCars key={product.articleId} card={product} />
        ))}
      </div>
{showLess && !isSearchMode && (
        <button onClick={() => setVisibleCount((prev) => Math.max(PAGE_SIZE, prev - PAGE_SIZE))}>
          ver menos
        </button>
      )}
      {canShowMore && !isSearchMode && (
        <button onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}>
          ver más
        </button>
      )}
      
    </div>
  );
};

export default CarsParst;
