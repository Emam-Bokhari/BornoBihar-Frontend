export type TOrderStatusItem = {
  status: string;
  count: number;
  totalAmount: number;
  percentage: number;
};

export type TCategorySalesItem = {
  category: string;
  totalQuantitySold: number;
  totalRevenue: number;
  orderCount: number;
};

export type TMonthlySalesTrendItem = {
  year: number;
  month: string;
  monthKey: string;
  label: string;
  totalSales: number;
  orderCount: number;
};

export type TTopSellingBook = {
  productId: string;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  currentStock: number;
  totalSold: number;
  totalRevenue: number;
};

export type TInventoryAlert = {
  productId: string;
  title: string;
  author: string;
  category: string;
  price: number;
  currentStock: number;
  image: string;
  stockStatus: "Out of Stock" | "Low Stock" | string;
};

export type TStats = {
  totalOrders: number;
  totalSales: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders?: number;
  deliveredOrders?: number;
  lowStockProducts?: number;
};
