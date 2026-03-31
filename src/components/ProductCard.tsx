import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  inCart: boolean;
  onToggle: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  inCart,
  onToggle,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className="product-card">
      <div className="product-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="product-card__body">
        <h2>{name}</h2>
        <p className="product-card__price">{formattedPrice}</p>
        <button
          type="button"
          className={`product-card__button ${inCart ? "is-added" : ""}`}
          onClick={onToggle}
        >
          {inCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
