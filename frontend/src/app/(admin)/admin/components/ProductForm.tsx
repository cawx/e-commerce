"use client";
import React, { FormEvent } from "react";

function ProductForm() {
  const formAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const category = formData.get("category");

    const res = await fetch("http://localhost:8080/products/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        quantity,
        category,
      }),
    });
    if (!res.ok) {
      const json = await res.json();
      return { message: json.message || "adding product failed" };
    } else {
      return { message: "product adding successful" };
    }
  };

  return (
    <div>
      <form onSubmit={formAction}>
        <input name="title" placeholder="title" type="text" />
        <input name="description" placeholder="description" type="text" />
        <input name="price" placeholder="price" type="number" />
        <input name="quantity" placeholder="quantity" type="number" />
        <input name="category" placeholder="category" type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ProductForm;
