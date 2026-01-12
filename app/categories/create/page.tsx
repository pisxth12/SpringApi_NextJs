"use client";

import CategoryForm from "@/components/CategoryForm";
import { CategoryApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
  const router = useRouter();

  const submit = async (fd: FormData) => {
    await CategoryApi.create(fd);
    router.push("/categories");
  };
  return (
    <div>
      <CategoryForm onSubmit={submit} />
    </div>
  );
}
