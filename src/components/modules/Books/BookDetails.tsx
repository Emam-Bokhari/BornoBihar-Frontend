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
import { TProduct } from "@/types";
import moment from "moment-timezone";
import { getCategoryColor } from "@/app/utils/getCategoryColor";

export default function BookDetails({ product }: { product: TProduct }) {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <Fragment>
      <CommonBannerSection title="Book Information" />
      <Container className=" my-12">
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
              {product?.title}
            </h1>
            <p className="text-[#8a8a8a] text-sm">by {product?.author}</p>
            <Badge
              className={`mt-2 capitalize ${getCategoryColor(
                product?.category
              )}`}
            >
              {product?.category}
            </Badge>

            <div className="flex items-center gap-2 mt-2">
              <Star className="text-yellow-500" />
              <span className="text-[#100E18]">
                {product?.rating.toFixed(1)} / 5
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xl font-bold text-[#F65D4E]">
                ${product?.price}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {product?.quantity > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Additional Book Details */}
            <div className="mt-4 text-gray-700">
              <h3 className="text-2xl font-semibold text-[#100E18]">
                Additional Information
              </h3>
              <div className="space-y-2 mt-2 text-base">
                <p>
                  <strong>Publisher:</strong>{" "}
                  <span className="text-[#8a8a8a]">{product?.publisher}</span>
                </p>
                <p>
                  <strong>Published Date:</strong>{" "}
                  <span className="text-[#8a8a8a]">
                    {moment
                      .utc(product?.publishedDate)
                      .format("MMMM DD, YYYY [UTC]")}
                  </span>
                </p>
                {product?.edition && (
                  <p>
                    <strong>Edition:</strong>{" "}
                    <span className="text-[#8a8a8a]">{product.edition}</span>
                  </p>
                )}
                <p>
                  <strong>Language:</strong>{" "}
                  <span className="text-[#8a8a8a] capitalize">
                    {product?.language}
                  </span>
                </p>
                {product?.pages && (
                  <p>
                    <strong>Pages:</strong>{" "}
                    <span className="text-[#8a8a8a]">{product.pages}</span>
                  </p>
                )}
                <p>
                  <strong>Format:</strong>{" "}
                  <span className="text-[#8a8a8a] capitalize">
                    {product.format}
                  </span>
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="mt-4 cursor-pointer"
                onClick={() => router.push("/checkout")}
                disabled={product?.quantity <= 0}
              >
                Add To Cart
                <CiShoppingCart />
              </Button>
              <Button
                className="mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
                onClick={() => router.push("/checkout")}
                disabled={product?.quantity <= 0}
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

          <TabsContent value="description" className="mt-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </TabsContent>

          <TabsContent value="about-author" className="mt-4">
            <h2 className="text-xl font-semibold">About the Author</h2>
            <p className="text-gray-700 mt-2">{product.aboutAuthor}</p>
          </TabsContent>

          <TabsContent value="shipping" className="mt-4">
            <h2 className="text-xl font-semibold">Shipping Details</h2>
            <p className="text-gray-700 mt-2">{product.shipping}</p>
            <h2 className="text-lg font-semibold mt-4">Returns Policy</h2>
            <p className="text-gray-700 mt-2">{product.returnsPolicy}</p>
          </TabsContent>

          <TabsContent value="terms" className="mt-4">
            <h2 className="text-xl font-semibold">Terms of Sale</h2>
            <p className="text-gray-700 mt-2">{product.termsOfSale}</p>
          </TabsContent>
        </Tabs>
      </Container>
    </Fragment>
  );
}
