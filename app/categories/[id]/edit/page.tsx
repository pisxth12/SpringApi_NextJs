"use client";

import CategoryForm from "@/components/CategoryForm";
import { CategoryApi } from "@/lib/api";
import { Category } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  console.log(id);

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = () => {
    CategoryApi.getById(Number(id)).then(setCategory);
  };

  const submit = async (fd: FormData) => {
    await CategoryApi.update(Number(id), fd);
    router.push("/categories");
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div>
      <CategoryForm initialData={category} onSubmit={submit} />
    </div>
  );
}
