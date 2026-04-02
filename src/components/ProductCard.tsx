import React from "react";

interface ProductCardProps {
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image: string;
}
// React FUnction Component
const ProductCard: React.FC<ProductCardProps> = ({
  title,
  brand,
  category,
  description,
  price,
  image,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
  // Contohnya: 225000 akan menjadi "Rp225.000"
  return (
    <article className="product-card">
      <div className="product-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="product-card__body">
        <p className="product-card__tag">{category}</p>
        <h2>{title}</h2>
        <p className="product-card__brand">{brand}</p>
        <p className="product-card__desc">{description}</p>
        <p className="product-card__price">{formattedPrice}</p>
      </div>
    </article>
  );
};

export default ProductCard;
