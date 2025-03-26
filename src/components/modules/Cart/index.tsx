import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ShoppingCart() {
  return (
    <Container className="my-12 min-h-[80vh]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shopping Cart Section */}
        <div className=" lg:col-span-2">
          <h2 className="text-2xl font-semibold text-[#100E18]">
            Shopping Cart
          </h2>
          <p className="text-[#8a8a8a]">3 Items</p>

          <div className="mt-6 space-y-4">
            {/* Cart Items */}
            {[
              { name: "Book Title 1", price: 20.0, quantity: 2, total: 40.0 },
              { name: "Book Title 2", price: 15.0, quantity: 1, total: 15.0 },
              { name: "Book Title 3", price: 25.0, quantity: 1, total: 25.0 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-[#100E18]">
                    {item.name}
                  </h3>
                  <p className="text-[#8a8a8a]">Book Category</p>
                  <button className="text-red-500 text-sm">Remove</button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-2 py-1 border">-</button>
                  <span>{item.quantity}</span>
                  <button className="px-2 py-1 border">+</button>
                </div>
                <p className="text-[#100E18] font-semibold">
                  ${item.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <Link
              href="/books"
              className="text-[#F65D4E] hover:text-[#D84C3F] font-semibold  mt-12  flex items-center gap-2 "
            >
              <FaArrowLeftLong /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary & Shipping Address Section */}
        <div className="bg-gray-100 min-h-[80vh] p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[#100E18]">
              <p>Items</p>
              <p>$80.00</p>
            </div>
            <div className="flex justify-between text-[#100E18]">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-[#100E18]">
              <p>Total Cost</p>
              <p>$85.00</p>
            </div>
          </div>

          {/* Shipping Address Form */}
          <h2 className="text-xl font-semibold mt-6">Shipping Address</h2>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <input
              type="text"
              placeholder="Country"
              className="w-full px-3 py-2 border rounded-md"
            />
          </form>

          <Button className="mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white w-full">
            Checkout
          </Button>
        </div>
      </div>
    </Container>
  );
}
