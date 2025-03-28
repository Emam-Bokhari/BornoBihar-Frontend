import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Container from "@/components/shared/Container";
import fiction from "@/assets/fiction.png";
import nonfiction from "@/assets/non-fiction.png";
import academic from "@/assets/academic.png";
import philosophy from "@/assets/philosophy.png";
import children from "@/assets/children.png";
import science from "@/assets/science.png";
import religion from "@/assets/religion.png";
import history from "@/assets/history.png";

const books = [
  {
    title: "Fiction",
    image: fiction,
  },
  {
    title: "Non Fiction",
    image: nonfiction,
  },
  {
    title: "Academic",
    image: academic,
  },
  {
    title: "Philosophy",
    image: philosophy,
  },
  {
    title: "Children",
    image: children,
  },
  {
    title: "Science",
    image: science,
  },
  {
    title: "Religion",
    image: religion,
  },
  {
    title: "History",
    image: history,
  },
];

export default function BookCategoryCarousel() {
  return (
    <Container className="my-12">
      <div className="w-full mx-auto ">
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
          <CarouselPrevious className="left-2 text-[#F65D4E] hover:text-[#D84C3F]" />
          <CarouselNext className="right-2 text-[#F65D4E] hover:text-[#D84C3F]" />
        </Carousel>
      </div>
    </Container>
  );
}
