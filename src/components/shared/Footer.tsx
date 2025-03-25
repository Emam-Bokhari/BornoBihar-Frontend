import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#f7fafc] py-12 mt-12">
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
            <p className="text-base text-[#8a8a8a] mt-3 leading-relaxed">
              Discover the world’s best books with us. Whether you love fiction,
              non-fiction, or academic resources, we provide top-quality
              selections for every reader.
            </p>
            <p className="text-sm text-[#8a8a8a] mt-2">
              Have questions? Reach out to us at:
              <br />
              <span className="font-semibold text-[#100E18]">
                support@bornobihar.com
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <nav>
            <h3 className="text-lg font-semibold mb-3 text-[#100E18]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          {/* category */}
          <nav>
            <h3 className="text-lg font-semibold mb-3 text-[#100E18]">
              Category
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[#F65D4E] text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#100E18]">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="text-2xl" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaXTwitter className="text-2xl" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <IoLogoInstagram className="text-2xl " />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-[#8a8a8a]">
            &copy; {new Date().getFullYear()} Bookstore | All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
