"use client";
import React from "react";
import { useActionState } from "react";
import { addProduct } from "../api/Products";
const initialState = {
  message: "",
};

function ProductForm() {
  const [state, formAction, pending] = useActionState(addProduct, initialState);
  return (
    <div>
      <form action={formAction}>
        <input name="title" placeholder="title" type="text" />
        <input name="description" placeholder="description" type="text" />
        <input name="price" placeholder="price" type="number" />
        <input name="quantity" placeholder="quantity" type="number" />
        <input name="category" placeholder="category" type="text" />
        <button disabled={pending} type="submit">
          submit
        </button>
      </form>
      <p>{state.message}</p>
    </div>
  );
}

export default ProductForm;
