"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllProducts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
            next: {
                revalidate: 30,
                tags: ["PRODUCT"],
            },
        });
        if (!res.ok) {
            return { success: false, data: [] };
        }
        const data = await res.json();
        return data;
    } catch {
        return { success: false, data: [] };
    }
};

export const getProductsByCategory = async (category: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/category/${category}`, {
            next: {
                tags: ["PRODUCT"],
            },
        });
        if (!res.ok) {
            return { success: false, data: [] };
        }
        const data = await res.json();
        return data;
    } catch {
        return { success: false, data: [] };
    }
};

export const getProductById = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            cache: "no-store",
            next: {
                tags: ["PRODUCT"],
            },
        });
        if (!res.ok) {
            return { success: false, data: null };
        }
        const data = await res.json();
        return data;
    } catch {
        return { success: false, data: null };
    }
};

export const addProduct = async (productData: FieldValues | Record<string, unknown>) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(productData),
        });
        revalidateTag("PRODUCT");

        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to add product",
        };
    }
};

export const updateProductById = async (id: string, updatedProductData: FieldValues | Record<string, unknown>) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(updatedProductData),
        });
        revalidateTag("PRODUCT");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to update product",
        };
    }
};

export const deleteProductById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        revalidateTag("PRODUCT");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to delete product",
        };
    }
};
