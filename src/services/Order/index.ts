"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addOrder = async (orderData: any,) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(orderData),
        })
        revalidateTag("ORDER");

        const data = await res.json()

        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getOrderHistory = async () => {
    try {
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
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );

        const data = await response.json();

        return data;

    } catch (error: any) {
        throw new Error(error)
    }
};

export const getAllOrders = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
            next: {
                revalidate: 30,
                tags: ["ORDER"]
            },
            method: "GET",
            headers: {
                "Authorization": (await cookies()).get("accessToken")!.value,
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const getOrderById = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`, {
            cache: "no-store",
            next: {
                tags: ["ORDER"]
            },
            method: "GET",
            headers: {
                "Authorization": (await cookies()).get("accessToken")!.value,
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateOrderStatusById = async (id: string, status: any) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(status)
        })
        revalidateTag("ORDER");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}