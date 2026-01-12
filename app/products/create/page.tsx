'use client';

import ProductForm from '@/components/ProductForm';
import { ProductApi, CategoryApi } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/types';

export default function CreateProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const data = await CategoryApi.getAll();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        await ProductApi.create(formData);
        router.push('/products');
    };
    if (categories.length === 0) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Create Product</h2>
            <ProductForm categories={categories} onSubmit={handleSubmit} />
        </div>
    );
}
