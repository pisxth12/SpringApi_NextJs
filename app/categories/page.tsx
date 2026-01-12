'use client';

import { CategoryApi } from '@/lib/api';
import { Category } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateCategoryPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        async function fetchData() {
            try{
                await CategoryApi.getAll();
                setCategories(await CategoryApi.getAll());
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    const handleDelete = async (id: number) => {
        if(!confirm('Delete this category?')){
            return;
        }
        await CategoryApi.delete(id);
        setCategories(prev => prev.filter(cat => cat.id !== id));
    }



    const handleSubmit = async (formData: FormData) => {
        await CategoryApi.create(formData);
        router.push('/categories');
    };

    if(loading) return (
        <div>Loading...</div>
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Link
                    href="/categories/create"
                    className="px-4 py-2 bg-blue-600 text-white  rounded hover:bg-blue-700"
                >
                    + Create
                </Link>
            </div>

            <table className="min-w-full border border-gray-200  rounded">
                <thead className="bg-gray-100">
                    <tr className='text-black'>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id} className="text-center">
                            <td className="px-4 py-2 border">{cat.id}</td>
                            <td className="px-4 py-2 border">{cat.name}</td>
                            <td className="px-4 py-2 border">{cat.status}</td>
                            <td className="px-4 py-2 border">
                                {cat.imageUrl && (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${cat.imageUrl}`}
                                        alt={cat.name}
                                        className="h-12 w-12 object-cover rounded"
                                    />
                                )}
                            </td>
                            <td className="px-4 py-2 border space-x-2">
                                <Link
                                    href={`/categories/${cat.id}/edit`}
                                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {categories.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 border text-center text-gray-500">
                                No categories found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
