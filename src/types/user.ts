export interface IUser {
    email: string;
    iat: string;
    exp: string;
    role: string;
}

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'banned';
    isDeleted?: false;
    // profile update related additional fields
    image?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    gender?: 'male' | 'female';
    age?: string;
    phone?: string;
}