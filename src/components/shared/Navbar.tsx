"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Container from "./Container";
import NavigationLink from "./NavigationLink";
import { MdFavoriteBorder } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineBook,
  AiOutlinePhone,
  AiOutlineLogin,
} from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { Fragment, useEffect, useState } from "react";
import { LayoutDashboard, LogOutIcon, UserCircle2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { logoutFromCookie } from "@/services/Auth";
import { IUser } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Badge } from "../ui/badge";

export const MegaMenu = () => {
  return (
    <div className="border max-w-screen absolute left-0 mt-2 rounded-lg p-6 bg-white shadow-xl flex gap-6 z-100 invisible group-hover:visible transition-all duration-300 ease-in-out">
      {/* category */}
      <div className="flex-1 min-w-[260px] border-r pr-6">
        <h3 className="text-gray-500 font-semibold uppercase mb-3">Category</h3>
        <ul className="space-y-2 text-gray-700">
          <li>Fiction</li>
          <li>Non Fiction</li>
          <li>Academic</li>
          <li>Philosophy</li>
          <li>Children</li>
          <li>Science</li>
        </ul>
      </div>

      {/* books */}
      <div className="flex-1 min-w-[260px] border-r pr-6">
        <h3 className="text-gray-500 font-semibold uppercase mb-3">Books</h3>
        <ul className="space-y-2 text-gray-700">
          <li>Boxed Style</li>
          <li>Full Style</li>
          <li>Product Sidebar</li>
          <li>Bought Together</li>
          <li>Product Countdown</li>
          <li>Grouped Product</li>
        </ul>
      </div>

      {/* Promo Section */}
      <div className="flex-1 min-w-[260px] flex flex-col items-center">
        <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg"
            alt="Best Offer"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center mt-3">
          <p className="text-gray-500 text-sm">Best Offer</p>
          <p className="text-lg font-bold text-gray-900">save $15</p>
          <p className="text-gray-500 text-xs">ON SELECTED ITEMS</p>
          <Link href="/books">
            <Button className="mt-3 bg-[#F65D4E] hover:bg-[#D84C3F] rounded-full cursor-pointer">
              See More →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Navbar({ user }: { user: IUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart?.products);
  console.log(user?.role);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logoutFromCookie();
    // router.push("/");
  };

  return (
    <div>
      <div className="bg-[#FFA799] text-[#100E18] font-medium text-center py-2">
        🎉 Welcome to BornoBihar! Get up to 30% discount on bestsellers! 🎉
      </div>
      <div
        className={` ${
          isScrolled
            ? "lg:fixed lg:top-0 lg:left-0 lg:w-full lg:bg-[#FAF6F2] lg:z-50 lg:shadow-md"
            : ""
        }`}
      >
        <Container>
          <div>
            <nav className="flex items-center justify-between  py-4">
              {/* Logo - Left Side */}
              <Link href="/" className="block">
                <div className="flex items-center space-x-2">
                  <Image
                    src={logo}
                    alt="BornoBihar logo"
                    width={60}
                    height={60}
                  />
                  <span className="text-xl font-bold text-[#F65D4E]">
                    BornoBihar
                  </span>
                </div>
              </Link>

              {/* Menu (Desktop) */}
              <ul className="hidden lg:flex items-center gap-8 text-lg">
                <li>
                  <NavigationLink route="Home" path="/" />
                </li>
                <li>
                  <NavigationLink route="About Us" path="/about" />
                </li>
                <li>
                  <NavigationLink route="Books" path="/books" />
                </li>
                <li className="group relative">
                  <NavigationLink route="Collections" path="#" />
                  <MegaMenu />
                </li>
                <li>
                  <NavigationLink route="Category" path="/category" />
                </li>
                <li>
                  <NavigationLink route="Blogs" path="/blogs" />
                </li>
                <li>
                  <NavigationLink route="Contact" path="/contact" />
                </li>
              </ul>

              {/* Right Side Buttons (Desktop) */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/wishlist" className="block">
                  <span className="text-2xl hover:text-red-500 transition-colors">
                    <MdFavoriteBorder />
                  </span>
                </Link>
                <Link href="/cart" className="relative block">
                  <span className="text-2xl">
                    <BsCart />
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center  rounded-full">
                      {cartItems.length}
                    </Badge>
                  </span>
                </Link>
                <Link
                  href="/login"
                  className={`text-[#F65D4E] hover:text-[#D84C3F] block ${
                    user && "hidden"
                  }`}
                >
                  Log In
                </Link>
                <Link href="/register" className="block">
                  <Button
                    className={`bg-[#F65D4E] text-white hover:bg-[#D84C3F] cursor-pointer ${
                      user && "hidden"
                    }`}
                  >
                    SignUp
                  </Button>
                </Link>
                {/* profile dropdown visible for large devices */}
                {user && (
                  <div className="hidden lg:flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="cursor-pointer">
                        <UserCircle2 size={28} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link
                              href={
                                user.role === "admin"
                                  ? "/admin/dashboard"
                                  : "/user/dashboard"
                              }
                              className="flex items-center gap-2 text-base"
                            >
                              <LayoutDashboard className="w-6 h-6" />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem onClick={handleLogout}>
                            <span className="flex gap-2 items-center text-base cursor-pointer">
                              <LogOutIcon className="w-6 h-6" />
                              Logout
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button - Right Side */}
              <div className="lg:hidden ml-auto flex items-center space-x-2">
                <span className="text-xl lg:text-2xl">
                  <MdFavoriteBorder />
                </span>
                <span className="text-2xl lg:text-2xl">
                  <BsCart />
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <RxHamburgerMenu />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <AiOutlineHome className="mr-2 text-lg" />
                      <Link href="/" className="text-[#100E18] ">
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AiOutlineInfoCircle className="mr-2 text-lg" />
                      <Link href="/about" className="text-[#100E18] ">
                        About Us
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AiOutlineBook className="mr-2 text-lg" />
                      <Link href="/books" className="text-[#100E18] ">
                        Books
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AiOutlinePhone className="mr-2 text-lg" />
                      <Link href="/contact" className="text-[#100E18] ">
                        Contact
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`${user && "hidden"}`}>
                      <AiOutlineLogin className="mr-2 text-lg" />
                      <Link href="/login" className="text-[#100E18] ">
                        Log In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`${user && "hidden"}`}>
                      <IoPersonAddOutline className="mr-2 text-lg" />
                      <Button className=" bg-[#F65D4E] text-white hover:bg-[#D84C3F]">
                        SignUp
                      </Button>
                    </DropdownMenuItem>
                    {user && (
                      <Fragment>
                        <DropdownMenuItem>
                          <Link
                            href={`${
                              user?.role === "admin"
                                ? "/admin/dashboard"
                                : "/user/dashboard"
                            }`}
                            className="flex gap-2 text-base items-center"
                          >
                            <LayoutDashboard className="w-6 h-6" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>

                        <Separator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <span className="flex gap-2 text-base items-center cursor-pointer">
                            <LogOutIcon className="w-6 h-6" />
                            Logout
                          </span>
                        </DropdownMenuItem>
                      </Fragment>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}
