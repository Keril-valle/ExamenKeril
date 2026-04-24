import "../component/card.css";
import type { CarPart } from "../types/CarPart";

type CardCarsProps = {
  card: CarPart;
};

const CardCars = ({ card }: CardCarsProps) => {
  return (
    <div className="product-card">
      <img src={card.s3image} alt={card.articleProductName} className="product-image" />
      <div className="product-info">
        <h3 className="product-h1">{card.articleProductName}</h3>
        <p className="product-description">Proveedor: {card.supplierName}</p>
        <p className="product-description">Codigo: {card.articleNo}</p>
        <br />
      </div>
    </div>
  );
};

export default CardCars;
