"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const books = [
  {
    title: "The Book of Five Rings",
    author: "Georgia Ramirez",
    price: "$439.83",
    image: "/book1.jpg",
    rating: 4,
  },
  {
    title: "Treachery: Alpha Colony Book 8",
    author: "Jessica Munoz",
    price: "$569.00",
    image: "/book2.jpg",
    rating: 4.5,
  },
  {
    title: "Blood on the Snow",
    author: "Rex Rios",
    price: "$129.00",
    image: "/book3.jpg",
    rating: 3.5,
  },
];

export default function BookCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {books.map((book, index) => (
        <Card key={index} className="rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full h-64">
            <Image
              src={book.image}
              alt={book.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                  strokeWidth={1}
                />
              ))}
              <span className="text-sm text-gray-600">{book.rating}</span>
            </div>
            <p className="text-gray-500 text-sm">{book.author}</p>
            <p className="text-red-600 font-bold text-lg">{book.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
