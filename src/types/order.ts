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
    role: string;
}

export type TOrder = {
    _id: string;
    userId?: TUserId;
    products: {
        productId: string;
        quantity: number;
    }[];
    totalAmount?: number;
    paymentMethod?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed' | 'canceled';
    shippingAddressDetails: TShippingAddressDetails;
    status: 'pending' | 'shipping' | 'delivered';
    orderDate?: Date;
    transactionId?: string;
};