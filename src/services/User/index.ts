"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getMe = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
            method: "GET",
            cache: "no-store",
            next: {
                tags: ["USER"],
            },
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

export const updateProfile = async (updatedData: FieldValues | Record<string, unknown>) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/update-profile`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            }
        );
        revalidateTag("USER");
        const data = await response.json();

        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to update profile",
        };
    }
};

export const getAllUsers = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
            next: {
                tags: ["USER"],
                revalidate: 30,
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

export const getUserById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`,
            {
                cache: "no-store",
                next: {
                    tags: ["USER"],
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

export const updateUserStatusById = async (id: string, status: FieldValues | Record<string, unknown> | string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(typeof status === "string" ? { status } : status),
        });
        revalidateTag("USER");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to update user status",
        };
    }
};

export const updateUserRoleById = async (id: string, status: FieldValues | Record<string, unknown> | string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}/role`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(typeof status === "string" ? { status } : status),
        });
        revalidateTag("USER");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to update user role",
        };
    }
};

export const deleteUserById = async (id: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        revalidateTag("USER");
        const data = await res.json();
        return data;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message || "Failed to delete user",
        };
    }
};
