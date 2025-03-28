import Container from "@/components/shared/Container";
import Image from "next/image";
import React from "react";
import offerIcon from "@/assets/offer.png";
import dealIcon from "@/assets/deal.png";
import deliveryIcon from "@/assets/delivery.png";
import returnIcon from "@/assets/return.png";
import shoppingIcon from "@/assets/shopping.png";

export default function PromotionSummaryBar() {
  const features = [
    {
      icon: offerIcon,
      title: "Best Prices & Offers",
      description: "Orders $50 or more",
    },
    {
      icon: deliveryIcon,
      title: "Free Delivery",
      description: "24/7 Amazing services",
    },
    {
      icon: dealIcon,
      title: "Great Daily Deal",
      description: "When you sign up",
    },
    {
      icon: shoppingIcon,
      title: "Wide Assortment",
      description: "Mega Discounts",
    },
    {
      icon: returnIcon,
      title: "Easy Returns",
      description: "Within 30 days",
    },
  ];

  return (
    <Container>
      <div className="flex justify-center items-center py-8 bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4  w-full">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="bg-red-200 w-[100px] h-[100px] rounded-full  flex items-center justify-center text-2xl text-red-600">
                <div className="w-[60px] h-[60px] relative overflow-hidden rounded-lg ">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className=" mt-2">
                <h3 className="text-lg font-semibold text-[#100E18]">
                  {feature.title}
                </h3>
                <p className="text-[#8a8a8a] text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
