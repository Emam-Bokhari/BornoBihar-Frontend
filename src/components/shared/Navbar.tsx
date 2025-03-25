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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
                <li>
                  <NavigationLink route="Contact" path="/contact" />
                </li>
              </ul>

              {/* Right Side Buttons (Desktop) */}
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-2xl">
                  <MdFavoriteBorder />
                </span>
                <span className="text-2xl">
                  <BsCart />
                </span>
                <Link
                  href="/login"
                  className="text-[#F65D4E] hover:text-[#D84C3F] block"
                >
                  Log In
                </Link>
                <Link href="/register" className="block">
                  <Button className="bg-[#F65D4E] text-white hover:bg-[#D84C3F] cursor-pointer">
                    SignUp
                  </Button>
                </Link>
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
                    <DropdownMenuItem>
                      <AiOutlineLogin className="mr-2 text-lg" />
                      <Link href="/login" className="text-[#100E18] ">
                        Log In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IoPersonAddOutline className="mr-2 text-lg" />
                      <Button className=" bg-[#F65D4E] text-white hover:bg-[#D84C3F]">
                        SignUp
                      </Button>
                    </DropdownMenuItem>
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
