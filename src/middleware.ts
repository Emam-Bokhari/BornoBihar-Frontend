import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth"

type Role = keyof typeof roleBasedPrivateRoutes;

export const authRoutes = ["/login", "/register"]

const roleBasedPrivateRoutes = {
    user: [/^\/user/, /^\/cart/, /^\/checkout/, /^\/dashboard\/user\/books\/recent-viewed-books/, /^\/dashboard\/user\/orders\/order-history/, /^\/dashboard\/user\/profile/, /^\/dashboard\/user\/supports\/add-support/],

    admin: [/^\/admin/, /^\/user/, /^\/cart/, /^\/checkout/, /^\/dashboard\/user\/books\/recent-viewed-books/, /^\/dashboard\/user\/orders\/order-history/, /^\/dashboard\/user\/profile/, /^\/dashboard\/admin\/users/, /^\/dashboard\/admin\/orders/, /^\/dashboard\/admin\/contacts/, /^\/dashboard\/admin\/products/, /^\/dashboard\/admin\/products\/add-product/, /^\/dashboard\/admin\/products\/update-product/, /^\/dashboard\/admin\/supports/, /^\/dashboard\/admin\/blogs/, /^\/dashboard\/admin\/blogs\/add-blog/, /^\/dashboard\/admin\/blogs\/update-blog/, /^\/dashboard\/admin\/newsletters/],
};

export const middleware = async (request: NextRequest) => {

    const { pathname } = request.nextUrl
    const userInfo = await getCurrentUser();


    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(
                new URL(`http://localhost:3000/login`, request.url)
            )
        }
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", request.url));
    }


}

export const config = {
    matcher: [
        "/user/:page",
        "/admin/:page",
        "/cart",
        "/checkout",
        "/user/dashboard/profile",
        "/user/dashboard/books/recent-viewed-books",
        "/user/dashboard/orders/order-history",
        "/admin/dashboard/supports",
        "/user/dashboard/supports/add-support",
        "/admin/dashboard/users",
        "/admin/dashboard/orders",
        "/admin/dashboard/contacts",
        "/admin/dashboard/products",
        "/admin/dashboard/products/add-product",
        "/admin/dashboard/products/update-product",
        "/admin/dashboard/blogs",
        "/admin/dashboard/blogs/add-blog",
        "/admin/dashboard/blogs/update-blog",
        "/admin/dashboard/newsletters",
    ]
}