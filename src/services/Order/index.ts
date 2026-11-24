"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addOrder = async (orderData: FieldValues | Record<string, unknown>) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(orderData),
        });
        revalidateTag("ORDER");

        const data = await res.json();

        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to add order",
        };
    }
};

export const getOrderHistory = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/byUser`,
            {
                next: {
                    tags: ["ORDER"],
                    revalidate: 30,
                },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        if (!response.ok) {
            return { success: false, data: [] };
        }

        const data = await response.json();

        return data;

    } catch {
        return { success: false, data: [] };
    }
};

export const getAllOrders = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            next: {
                revalidate: 30,
                tags: ["ORDER"],
            },
            method: "GET",
            headers: {
                Authorization: token,
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

export const getOrderById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`, {
            cache: "no-store",
            next: {
                tags: ["ORDER"],
            },
            method: "GET",
            headers: {
                Authorization: token,
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

export const updateOrderStatusById = async (id: string, status: FieldValues | Record<string, unknown> | string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(typeof status === "string" ? { status } : status),
        });
        revalidateTag("ORDER");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to update order status",
        };
    }
};
