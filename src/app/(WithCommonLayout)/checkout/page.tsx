"use client";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";

const demoBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 450,
    image:
      "https://img.freepik.com/free-photo/3d-view-books-cartoon-style_52683-117188.jpg?t=st=1742962685~exp=1742966285~hmac=dd90cf3270dc2f4bf4ee02f4127e9ae5aa4e38c9390c48c23124213c68f117f8&w=826",
    category: "Classic Literature",
    quantity: 1,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 380,
    image:
      "https://img.freepik.com/free-photo/education-concept-with-book_23-2149001214.jpg?t=st=1742962747~exp=1742966347~hmac=55f8a3cd0e2971ccdd161f958bdbe6c7d55c97f797aec53495acf52b60b39089&w=740",
    category: "Dystopian Fiction",
    quantity: 2,
  },
];

const demoUser = {
  name: "John Doe",
  email: "john@example.com",
  city: "Dhaka, Bangladesh",
};

export default function Checkout() {
  // Calculate the total price for all books in the cart
  const totalPrice = demoBooks.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  return (
    <Container className="my-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
        {/* Left Section: User & Book Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-[#100E18]">
                Shipping Information
              </h2>
              <div className="space-y-1 mt-4">
                <p className="text-[#100E18]">{demoUser.name}</p>
                <p className="text-[#100E18]">{demoUser.email}</p>
                <p className="text-[#100E18]">{demoUser.city}</p>
              </div>
            </CardContent>
          </Card>

          {/* Display each book in the cart */}
          {demoBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-[100px] h-[100px] relative overflow-hidden rounded-lg ">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s"
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
                    BDT {book.price} x {book.quantity}
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
                  You can return the book within 7 days of delivery if it is in
                  its original condition. Refunds will be processed within 5-7
                  business days.
                </p>
                <a href="#" className="text-blue-600 hover:underline text-sm">
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
              {demoBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex justify-between text-sm text-[#100E18]"
                >
                  <span>
                    {book.title} ({book.quantity} x)
                  </span>
                  <span>BDT {book.price * book.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-[#100E18]">
                <span>Shipping Cost:</span>
                <span>BDT 100</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-[#100E18]">
                <span>Total:</span>
                <span>BDT {totalPrice + 100}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <Label className="flex items-center space-x-2 text-sm">
                <Checkbox /> <span>I agree to the Terms & Conditions</span>
              </Label>
              <Button className="w-full bg-[#F65D4E] hover:bg-[#D84C3F] text-white">
                Confirm & Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
