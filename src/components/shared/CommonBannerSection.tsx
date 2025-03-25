import Image from "next/image";
import { Fragment } from "react";
import commonBannerImage from "@/assets/book-banner-section.jpg";
import Container from "./Container";

export default function CommonBannerSection({ title }: { title: string }) {
  return (
    <Fragment>
      <div className="relative w-full h-[30vh]">
        {/* Background Image */}
        <Image
          src={commonBannerImage}
          alt="Common banner section image"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <Container>
          {/* Title */}
          <h3 className="absolute  top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
            {title}
          </h3>
        </Container>
      </div>
    </Fragment>
  );
}
