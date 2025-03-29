"use client";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { shippingAddressSchema } from "./checkout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrder } from "@/services/Order";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
    },
  });
  // fetch cart products and user info from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.products);

  // calculate the total price of all items in the cart
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const modifiedData = {
      products: cartItems?.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      shippingAddressDetails: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
      },
    };

    try {
      const response = await addOrder(modifiedData);

      if (response?.success) {
        toast.success(response?.message);
        if (response?.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        }
        dispatch(clearCart());
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  return (
    <Container className="my-12">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
            {/* Left Section: User & Book Details */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-[#100E18]">
                    Shipping Information
                  </h2>

                  <div className="space-y-4 mt-4 ">
                    {/* name and contact number */}
                    <div className="flex flex-col md:flex-row gap-4 w-full ">
                      {/* Name Input */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Contact Number Input */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your phone number"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Address Input */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter your address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* postal code ant city */}
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Postal Code Input */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your postal code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* City Input */}
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your city"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Country Input */}

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your country"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Display each book in the cart */}
              {cartItems?.map((book) => (
                <Card key={book._id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-[100px] h-[100px] relative overflow-hidden rounded-lg ">
                      <Image
                        src={book?.images[0]}
                        alt="Thumbnail Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#100E18]">
                        {book.title}
                      </h3>
                      <p className="text-[#8a8a8a]">by {book.author}</p>
                      <p className="text-gray-800 font-bold">
                        $ {book.price} x {book.quantity}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-[#f9fafb]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <RefreshCcw className="w-6 h-6 text-red-600" />
                    <h2 className="text-lg font-semibold">
                      Return & Refund Policy
                    </h2>
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-gray-700">
                      You can return the book within 7 days of delivery if it is
                      in its original condition. Refunds will be processed
                      within 5-7 business days.
                    </p>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      See more details
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section: Order Summary */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h2 className="text-lg font-semibold text-[#100E18]">
                    Order Summary
                  </h2>
                  {cartItems?.map((book) => (
                    <div
                      key={book._id}
                      className="flex justify-between text-sm text-[#100E18]"
                    >
                      <span>
                        {book.title} ({book.quantity} x)
                      </span>
                      <span>$ {book.price * book.quantity}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between font-bold text-[#100E18]">
                    <span>Total:</span>
                    <span>$ {totalPrice}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-4">
                  <Label className="flex items-center space-x-2 text-sm">
                    <Checkbox /> <span>I agree to the Terms & Conditions</span>
                  </Label>
                  <Button
                    type="submit"
                    className="w-full bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
