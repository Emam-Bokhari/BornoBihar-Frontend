"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllSupports = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/supports`, {
            next: {
                tags: ["SUPPORT"],
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getSupportById = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/supports/${id}`,
            {
                next: {
                    tags: ["CONTACT"],
                },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addSupport = async (contactData: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/supports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(contactData),
        });

        revalidateTag("SUPPORT");

        const data = await res.json();

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteSupportById = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/supports/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("SUPPORT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};