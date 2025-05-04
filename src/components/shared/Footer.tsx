import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#100E18] py-12 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
          {/* Logo & About Section */}
          <div>
            <Link href="/">
              <Image
                src={logo}
                width={120}
                height={50}
                alt="Bookstore Logo"
                className="transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-base text-white mt-3 leading-relaxed">
              Discover the world’s best books with us. Whether you love fiction,
              non-fiction, or academic resources, we provide top-quality
              selections for every reader.
            </p>
            <p className="text-sm text-[#8a8a8a] mt-2">
              Have questions? Reach out to us at:
              <br />
              <span className="font-semibold text-white">
                support@bornobihar.com
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <nav>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#F65D4E] text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#F65D4E] text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#F65D4E] text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>

          {/* category */}
          <nav>
            <h3 className="text-lg font-semibold mb-3 text-white">Category</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/fiction"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/category/nonFiction"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Non Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/category/academic"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Academic
                </Link>
              </li>
              <li>
                <Link
                  href="/category/philosophy"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/category/children"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Children
                </Link>
              </li>
              <li>
                <Link
                  href="/category/science"
                  className="hover:text-[#F65D4E] text-white"
                >
                  Science
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="text-2xl text-white" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaXTwitter className="text-2xl text-white" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <IoLogoInstagram className="text-2xl text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-white pt-6 text-center">
          <p className="text-sm text-[#8a8a8a]">
            &copy; {new Date().getFullYear()} Bookstore | All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
