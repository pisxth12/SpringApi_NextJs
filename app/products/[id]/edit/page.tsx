'use client';

import ProductForm from "@/components/ProductForm";
import { Category, Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then(res => res.json())
      .then(setCategories);
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    router.push("/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleUpdate}
      initialData={{
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        status: product.status,
        categoryId: product.category.id,
        imageUrl: product.imageUrl,
      }}
    />
  );
}
