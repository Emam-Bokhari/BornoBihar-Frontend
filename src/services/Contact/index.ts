"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllContacts = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
            next: {
                tags: ["CONTACT"],
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

export const getContactById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
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

export const addContact = async (contactData: FieldValues | Record<string, unknown>) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        });

        revalidateTag("CONTACT");

        const data = await res.json();

        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to add contact",
        };
    }
};

export const deleteContactById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        revalidateTag("CONTACT");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to delete contact",
        };
    }
};
