"use server";

export async function addProduct(prevState: unknown, formData: FormData) {
  const res = await fetch("http://localhost:8080/products/add", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      category: formData.get("category"),
    }),
  });
  if (!res.ok) {
    const json = await res.json();
    return { message: json.message || "adding product failed" };
  } else {
    return { message: "product adding successful" };
  }
}
