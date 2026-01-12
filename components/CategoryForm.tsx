'use client';

import React, { useState } from "react";

interface CategoryFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    initialData?: {
        name: string;
        description?: string;
        status: "ACTIVE" | "INACTIVE";
        imageUrl?: string;
    };
}
export default function CategoryForm({ onSubmit, initialData }: CategoryFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [status, setStatus] = useState(initialData?.status || "ACTIVE");
    const [image, setImage] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState<string | null>(
  initialData?.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${initialData.imageUrl}` : null
);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("name", name);
        fd.append("description", description);
        fd.append("status", status);
        if (image) fd.append("image", image);
        await onSubmit(fd);
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement) {
        const file = e.target.files?.[0] || null;
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file); 
        } else {
            setImagePreview(initialData?.imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${initialData.imageUrl}` : null);
        }
        return;
    }

    switch (name) {
        case "name":
            setName(value);
            break;
        case "description":
            setDescription(value);
            break;
        case "status":
            setStatus(value as "ACTIVE" | "INACTIVE");
            break;
    }
};



    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold text-gray-800">{initialData ? "Update Category" : "Create Category"}</h2>

            <div className="flex flex-col text-black">
                <label className="mb-2 font-medium text-gray-700">Name *</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category name"
                />
            </div>

            <div className="flex flex-col text-black">
                <label className="mb-2 font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    rows={3}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category description"
                />
            </div>

            <div className="flex flex-col text-black">
                <label className="mb-2 font-medium text-gray-700">Status</label>
                <select
                    name="status"
                    value={status}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
            </div>

             <div className="flex flex-col text-black">
                <label className="mb-2 font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 h-40 w-40 object-cover rounded border"
                    />
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {initialData ? "Update" : "Create"}
            </button>
        </form>
    );
}
