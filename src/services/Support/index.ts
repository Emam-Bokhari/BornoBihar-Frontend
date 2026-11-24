"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllSupports = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/supports`, {
            next: {
                tags: ["SUPPORT"],
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export const getSupportById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/supports/${id}`,
            {
                next: {
                    tags: ["CONTACT"],
                },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        if (!res.ok) {
            return { success: false, data: null };
        }
        const data = await res.json();
        return data;
    } catch {
        return { success: false, data: null };
    }
};

export const addSupport = async (contactData: FieldValues | Record<string, unknown>) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/supports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(contactData),
        });

        revalidateTag("SUPPORT");

        const data = await res.json();

        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to add support request",
        };
    }
};

export const deleteSupportById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/supports/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        revalidateTag("SUPPORT");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to delete support request",
        };
    }
};
