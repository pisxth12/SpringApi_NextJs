'use client';

import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to NextJS CRUD Demo</h1>

            <p className="mb-6">
                This is a demo app for managing <strong>Categories</strong> and <strong>Products</strong> using Next.js 13 App Router with TypeScript and Tailwind CSS.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/categories"
                    className="p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-center"
                >
                    Manage Categories
                </Link>

                <Link
                    href="/products"
                    className="p-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center"
                >
                    Manage Products
                </Link>
            </div>
        </div>
    );
}
