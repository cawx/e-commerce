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
  try {
    const response = await fetch("http://localhost:8080/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`failed to fetch products: ${response.statusText}`);
    }

    const data: ProductsResponse = await response.json();
    return data.content;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "failed to load products"
    );
  }
};

export default async function Products() {
  try {
    const products = await getProducts();
    return (
      <section className="section-padding">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
  } catch {
    return (
      <div className="section-padding text-base">
        Unable to load the products.
      </div>
    );
  }
}
