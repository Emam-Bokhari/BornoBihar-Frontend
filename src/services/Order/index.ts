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
        console.log(data)
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
                    tags: ["ORDER"]
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