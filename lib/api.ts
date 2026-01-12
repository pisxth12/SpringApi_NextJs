const API_URL = process.env.NEXT_PUBLIC_API_URL;


/* ---------- GENERIC ---------- */
export async function fetchApi(
    url:string, options?: RequestInit
){
    const res = await fetch(`${API_URL}${url}`,{
        ...options,
    });
    if(!res.ok){
        throw new Error("API ERROR");
    }
    return res.json();
}

/* ---------- CATEGORY ---------- */
export const CategoryApi = {
    getAll:() => fetchApi("/api/categories"),
    getById: (id:number) => fetchApi(`/api/categories/${id}`),
    create: (data:FormData) => fetch(`${API_URL}/api/categories`, {
        method: "POST",
        body: data,
    }),
    update: (id:number, data:FormData) => fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        body: data,
    }),
    delete: (id:number) => fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
    }),
}


/* ---------- PRODUCT ---------- */
export const ProductApi = {
    getAll:() => fetchApi("/api/products"),
    getById: (id:number) => fetchApi(`/api/products/${id}`),
    create: (data:FormData) => fetch(`${API_URL}/api/products`,{
        method: "POST",
        body: data,
    }),
    update: (id:number, data:FormData) => fetch(`${API_URL}/api/products/${id}`,{
        method: "PUT",
        body: data,
    }),
    delete: (id:number) => fetch(`${API_URL}/api/products/${id}`,{
        method: "DELETE",
    })
}


