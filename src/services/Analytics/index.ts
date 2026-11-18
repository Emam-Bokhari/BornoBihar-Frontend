"use server";

import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: token } : {}),
  };
};

export const getStats = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/getStats`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: {
        totalOrders: 0,
        totalSales: 0,
        totalUsers: 0,
        totalProducts: 0,
      },
      message: (error as Error)?.message || "Failed to fetch stats",
    };
  }
};

export const getOrderStatusDistribution = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/order-status-distribution`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: (error as Error)?.message || "Failed to fetch order status distribution",
    };
  }
};

export const getSalesByCategory = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/sales-by-category`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: (error as Error)?.message || "Failed to fetch sales by category",
    };
  }
};

export const getMonthlySalesTrend = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/monthly-sales-trend`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: (error as Error)?.message || "Failed to fetch monthly sales trend",
    };
  }
};

export const getTopSellingBooks = async (limit: number = 10) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/top-selling-books?limit=${limit}`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: (error as Error)?.message || "Failed to fetch top selling books",
    };
  }
};

export const getInventoryAlerts = async (threshold: number = 10) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/analytics/inventory-alert?threshold=${threshold}`,
      {
        next: {
          tags: ["ANALYTICS"],
          revalidate: 30,
        },
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: (error as Error)?.message || "Failed to fetch inventory alerts",
    };
  }
};
