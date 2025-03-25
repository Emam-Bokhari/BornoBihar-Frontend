import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Container from "@/components/shared/Container";

const books = [
  {
    title: "Christian Living",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Church History",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Educational Curriculum",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Fiction & Fantasy",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Religion & Spirituality",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Romance Books",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Religion & Spirituality",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
  {
    title: "Romance Books",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VHpHi-Wm0FioGf4sJ_flWN2OqVCTkLklnA&s",
  },
];

export default function BookCategoryCarousel() {
  return (
    <Container className="my-12">
      <div className="w-full mx-auto border-2 border-red-500">
        <Carousel className="w-full">
          <CarouselContent className="gap-4 ">
            {books.map((book, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/4 xl:basis-1/5 2xl:basis-1/6 flex justify-center"
              >
                <div className="p-2 flex flex-col items-center  hover:text-[#F65D4E] cursor-pointer hover:transform hover:translate-y-[-6px]  transition-all duration-300 ease-in-out">
                  <div className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden flex items-center gap-4 justify-center bg-gray-200">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={160}
                      height={160}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-base lg:text-lg text-center font-semibold">
                    {book.title}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </Container>
  );
}
