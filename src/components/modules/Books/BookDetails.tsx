"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/Container";
import CommonBannerSection from "@/components/shared/CommonBannerSection";
import { CiShoppingCart } from "react-icons/ci";

export default function BookDetails() {
  const router = useRouter();
  const product = {
    title: "The Art of Programming",
    author: "John Doe",
    category: "Technology",
    images: [
      "https://img.freepik.com/free-photo/3d-book-with-blank-blue-cover_107791-17004.jpg?uid=R44712517&ga=GA1.1.1288467147.1742623794&semt=ais_hybrid",
      "https://img.freepik.com/free-photo/open-flying-old-books_1232-2096.jpg?uid=R44712517&ga=GA1.1.1288467147.1742623794&semt=ais_hybrid",
      "https://img.freepik.com/free-photo/3d-book-with-blank-blue-cover_107791-17004.jpg?uid=R44712517&ga=GA1.1.1288467147.1742623794&semt=ais_hybrid",
    ],
    rating: 4.5,
    price: 29.99,

    description:
      "This book covers advanced programming concepts and best practices.This book covers advanced programming concepts and best practices.This book covers advanced programming concepts and best practices.This book covers advanced programming concepts and best practices.This book covers advanced programming concepts and best practices.",
    aboutAuthor:
      "John Doe is a software engineer with over 15 years of experience.John Doe is a software engineer with over 15 years of experience.John Doe is a software engineer with over 15 years of experience.",
    termsOfSale:
      "We offer a seven-day return and exchange policy. Returns and exchanges can be initiated from your account's orders section. The tags and stickers should be left on to ensure that the item is returned to you in the same condition in which it was delivered.",
    shippingDetails:
      "You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).You should expect to receive your refund within four weeks of giving your package ",
    returnsPolicy:
      "You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).If you need to return an item, simply login to your account, view the order using the 'Complete Orders' link under the My Account menu and click the Return Item(s) button. We'll notify you via e-mail of your refund once we've received and processed the returned item.",
    publisher: "Tech Publications",
    publishedDate: "2023-05-10",
    edition: "3rd",
    language: "english",
    pages: 450,
    format: "hardcover",
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <Fragment>
      <CommonBannerSection title="Book Details" />
      <Container className="border-2 border-red-500 my-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Images */}
          <div>
            <div className="relative w-full" style={{ height: "500px" }}>
              <Image
                src={selectedImage}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product?.images?.map((img, index) => (
                <div
                  key={index}
                  className="relative w-[100px] h-[100px] cursor-pointer"
                >
                  <Image
                    src={img}
                    alt="Thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg border hover:border-black"
                    onClick={() => handleThumbnailClick(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div>
            <h1 className="text-3xl font-semibold mb-2 text-[#100E18]">
              {product.title}
            </h1>
            <p className="text-[#8a8a8a] text-sm">by {product.author}</p>
            <Badge className="mt-2">{product.category}</Badge>

            <div className="flex items-center gap-2 mt-2">
              <Star className="text-yellow-500" />
              <span className="text-[#100E18]">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xl font-bold text-[#F65D4E]">
                ${product.price}
              </span>
            </div>

            {/* Additional Book Details */}
            <div className="mt-4 text-gray-700">
              <h3 className="text-2xl font-semibold text-[#100E18]">
                Additional Information
              </h3>
              <div className="space-y-2 mt-2 text-base">
                <p>
                  <strong>Publisher:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product.publisher}</span>
                </p>
                <p>
                  <strong>Published Date:</strong>
                  <span className="text-[#8a8a8a]">
                    {product.publishedDate}
                  </span>
                </p>
                <p>
                  <strong>Edition:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product.edition}</span>
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product.language}</span>
                </p>
                <p>
                  <strong>Pages:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product.pages}</span>
                </p>
                <p>
                  <strong>Format:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product.format}</span>
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="mt-4 cursor-pointer"
                onClick={() => router.push("/checkout")}
              >
                Add To Cart
                <CiShoppingCart />
              </Button>
              <Button
                className="mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
                onClick={() => router.push("/checkout")}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for Book Details */}
        <Tabs defaultValue="description" className="mt-6">
          <div className="overflow-x-auto">
            <TabsList className="flex space-x-2 border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="about-author">About the Author</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="terms">Terms of Sale</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="description" className="p-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </TabsContent>

          <TabsContent value="about-author" className="p-4">
            <h2 className="text-xl font-semibold">About the Author</h2>
            <p className="text-gray-700 mt-2">{product.aboutAuthor}</p>
          </TabsContent>

          <TabsContent value="shipping" className="p-4">
            <h2 className="text-xl font-semibold">Shipping Details</h2>
            <p className="text-gray-700 mt-2">{product.shippingDetails}</p>
            <h2 className="text-lg font-semibold mt-4">Returns Policy</h2>
            <p className="text-gray-700 mt-2">{product.returnsPolicy}</p>
          </TabsContent>

          <TabsContent value="terms" className="p-4">
            <h2 className="text-xl font-semibold">Terms of Sale</h2>
            <p className="text-gray-700 mt-2">{product.termsOfSale}</p>
          </TabsContent>
        </Tabs>
      </Container>
    </Fragment>
  );
}
