"use client";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart?.products);

  // Total Price Calculation
  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Total Ordered Items Count
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  // increment
  const handleIncrement = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  // decrement
  const handleDecrement = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  //   remove product
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Checkout handler

  return (
    <Container className="my-12">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Shopping Cart Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-[#100E18]">
            Shopping Cart
          </h2>
          <p className="text-[#8a8a8a]">{totalItems} Items Ordered</p>

          <div className="mt-6 space-y-4">
            {/* Cart Items */}
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-[#100E18]">
                    {item.title}
                  </h3>
                  <p className="text-[#8a8a8a] capitalize">
                    {item.category || "Book"}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-2 py-1 border cursor-pointer"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-2 py-1 border cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <p className="text-[#100E18] font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
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
        <div>
          <div className="bg-gray-100 w-full lg:w-92  p-6 rounded-lg">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[#100E18]">
                <p>Items Ordered</p>
                <p>{totalItems}</p>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-[#100E18]">
                <p>Total Cost</p>
                <p>${totalPrice?.toFixed(2) || "0.00"}</p>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white w-full cursor-pointer">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
