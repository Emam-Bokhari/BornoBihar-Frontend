"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProducts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
            next: {
                revalidate: 30,
                tags: ["PRODUCT"]
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const getProductById = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            cache: "no-store",
            next: {

                tags: ["PRODUCT"]
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const addProduct = async (productData: any,) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(productData),
        })
        revalidateTag("PRODUCT");

        const data = await res.json()
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateProductById = async (id: string, updatedProductData: any) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(updatedProductData)
        })
        revalidateTag("PRODUCT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const deleteProductById = async (id: string) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
        })
        revalidateTag("PRODUCT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}