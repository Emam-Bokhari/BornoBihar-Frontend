import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookOfTheMonthSection() {
  return (
    <div
      className="relative flex items-center justify-center p-10 h-[400px] lg:h-[500px] xl:h-[600px] bg-cover bg-center mt-16"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dvpqm6zct/image/upload/v1743205942/shiromani-kant-tHKlDb5EzN4-unsplash_jjtgmd.jpg")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 blur-sm"></div>
      <Container className="text-center z-10">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold  text-[#F65D4E] mb-6">
          Book of the Month 📖
        </h2>
        <p className="text-xl text-white leading-relaxed max-w-3xl mx-auto mb-8">
          This month’s top pick:{" "}
          <span className="font-bold text-white">
            {`"The Hidden Gems of Literature"`}
          </span>
          . A captivating journey through timeless stories, deep emotions, and
          thought-provoking narratives. Don’t miss out on this literary
          masterpiece!
        </p>
        <Link href="/books">
          <Button className="px-6 py-3 text-lg bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer">
            Explore Now
          </Button>
        </Link>
      </Container>
    </div>
  );
}
