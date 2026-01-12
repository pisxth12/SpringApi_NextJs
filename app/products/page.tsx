'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductApi } from '@/lib/api';

type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    status: string;
    category: {
        id: number;
        name: string;
    };
    imageUrl?: string;
};

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await ProductApi.getAll();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this product?')) return;
        await ProductApi.delete(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Products</h2>
                <Link
                    href="/products/create"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Create
                </Link>
            </div>

            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Stock</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">${product.price.toFixed(2)}</td>
                            <td className="border p-2">{product.stockQuantity}</td>
                            <td className="border p-2">{product.category.name}</td>
                            <td className="border p-2">{product.status}</td>
                            <td className="border p-2">
                                {product.imageUrl && (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                                        alt={product.name}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                )}
                            </td>
                            <td className="border p-2 space-x-2">
                                <Link
                                    href={`/products/${product.id}/edit`}
                                    className="text-blue-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
