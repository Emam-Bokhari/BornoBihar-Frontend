"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addNewsletter = async (newsletterData: FieldValues | Record<string, unknown>) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/newsletters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newsletterData),
        });
        revalidateTag("NEWSLETTER");

        const data = await res.json();

        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to add newsletter",
        };
    }
};

export const getAllNewsletters = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/newsletters`,
            {
                next: {
                    tags: ["NEWSLETTER"],
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

export const deleteNewsletterById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/newsletters/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        revalidateTag("NEWSLETTER");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to delete newsletter",
        };
    }
};
