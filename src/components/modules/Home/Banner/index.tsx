import { Button } from "@/components/ui/button";
import Image from "next/image";
import bannerImage from "@/assets/banner-image.jpg";

export default function BannerSection() {
  return (
    <section className="relative h-[60vh] py-16 text-white">
      <div className="container mx-auto px-6 text-center h-full flex flex-col justify-center items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black opacity-25 z-1"></div>{" "}
          {/* Overlay */}
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-white">
            Your Gateway to the Best Books
          </h1>
          <p className="text-base md:text-lg mb-6 text-white">
            Explore a diverse collection of books across every genre. Whether
            you’re an avid reader or just getting started,
            <br />
            we have something for everyone.
          </p>
          <Button className=" bg-[#F65D4E] text-white   hover:bg-[#D84C3F] cursor-pointer">
            Start Your Reading Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
