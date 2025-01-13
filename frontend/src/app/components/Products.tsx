import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  imageUrl: string;
}

interface ProductsResponse {
  content: Product[];
}

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:8080/products", {
    cache: "no-store",
  });
  const data: ProductsResponse = await response.json();
  return data.content;
};

export default async function Products() {
  const products = await getProducts();

  return (
    <section className="section-padding">
      <div className="flex gap-x-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            brand={product.brand}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
