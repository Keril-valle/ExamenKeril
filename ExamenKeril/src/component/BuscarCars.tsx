
import { useState } from "react";
import type { CarPart } from "../types/CarPart";

type BuscarCarsProps = {
  items: CarPart[];
  onSearch: (results: CarPart[] | null) => void;
};

const BuscarCars = ({ items, onSearch }: BuscarCarsProps) => {
  const [searchText, setSearchText] = useState("");

   const handleSearch = () => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      onSearch(null);
      return;
    }

    const filtered = items.filter(
      (item) => item.articleProductName.trim().toLowerCase() === query,
    );

    onSearch(filtered);
  };

  return (
    <> 
    <h1>buscar producto</h1>
     <input
      type="text"
      placeholder="Buscar por nombre del producto"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
     />
     <button onClick={handleSearch}>Buscar</button>
    </>
  )
}

export default BuscarCars
