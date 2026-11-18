export type TShippingAddressDetails = {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
};

type TUserId = {
    _id: string;
    name: string;
    email?: string;
    role: string;
}

export type TOrder = {
    _id: string;
    userId?: TUserId;
    products: {
        productId: string | { _id: string; title?: string; [key: string]: unknown };
        quantity: number;
    }[];
    totalAmount?: number;
    paymentMethod?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed' | 'canceled' | string;
    shippingAddressDetails: TShippingAddressDetails;
    status: 'pending' | 'shipping' | 'delivered' | 'cancelled' | string;
    orderDate?: Date;
    transactionId?: string;
    createdAt: string;
    updatedAt: string;
};