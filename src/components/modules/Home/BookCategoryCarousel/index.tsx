"use client";
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
import biography from "@/assets/biography.png";
import art from "@/assets/art.png";
import poetry from "@/assets/poetry.png";
import romance from "@/assets/romance.png";
import mystery from "@/assets/mystry.png";
import fantasy from "@/assets/fantasy.png";
import travel from "@/assets/travel.png";
import selfHelp from "@/assets/selfHelp.png";
import psychology from "@/assets/psychology.png";
import politics from "@/assets/politics.png";
import cookBook from "@/assets/cookBook.png";
import humor from "@/assets/humor.png";
import graphicNovels from "@/assets/graphicNovels.png";
import health from "@/assets/health.png";
import technology from "@/assets/technology.png";
import business from "@/assets/business.png";
import education from "@/assets/education.png";
import sports from "@/assets/sports.png";
import { useRouter } from "next/navigation";

const books = [
  {
    title: "fiction",
    label: "Fiction",
    image: fiction,
  },
  {
    title: "nonFiction",
    label: "Non Fiction",
    image: nonfiction,
  },
  {
    title: "academic",
    label: "Academic",
    image: academic,
  },
  {
    title: "philosophy",
    label: "Philosophy",
    image: philosophy,
  },
  {
    title: "children",
    label: "Children",
    image: children,
  },
  {
    title: "science",
    label: "Science",
    image: science,
  },
  {
    title: "religion",
    label: "Religion",
    image: religion,
  },
  {
    title: "history",
    label: "History",
    image: history,
  },
  {
    title: "biography",
    label: "Biography",
    image: biography,
  },
  {
    title: "art",
    label: "Art",
    image: art,
  },
  {
    title: "poetry",
    label: "Poetry",
    image: poetry,
  },
  {
    title: "romance",
    label: "Romance",
    image: romance,
  },
  {
    title: "mystery",
    label: "Mystery",
    image: mystery,
  },
  {
    title: "fantasy",
    label: "Fantasy",
    image: fantasy,
  },
  {
    title: "travel",
    label: "Travel",
    image: travel,
  },
  {
    title: "selfHelp",
    label: "Self Help",
    image: selfHelp,
  },
  {
    title: "psychology",
    label: "Psychology",
    image: psychology,
  },
  {
    title: "politics",
    label: "Politics",
    image: politics,
  },
  {
    title: "cookbook",
    label: "Cookbook",
    image: cookBook,
  },
  {
    title: "humor",
    label: "Humor",
    image: humor,
  },
  {
    title: "graphicNovels",
    label: "Graphic Novels",
    image: graphicNovels,
  },
  {
    title: "health",
    label: "Health",
    image: health,
  },
  {
    title: "technology",
    label: "Technology",
    image: technology,
  },
  {
    title: "business",
    label: "Business",
    image: business,
  },
  {
    title: "education",
    label: "Education",
    image: education,
  },
  {
    title: "sports",
    label: "Sports",
    image: sports,
  },
];

export default function BookCategoryCarousel() {
  const router = useRouter();
  return (
    <Container className="my-12">
      <div className="w-full mx-auto ">
        <Carousel className="w-full">
          <CarouselContent className="gap-4 ">
            {books.map((book, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/4 xl:basis-1/5 2xl:basis-1/6 flex justify-center"
                onClick={() => router.push(`/category/${book?.title}`)}
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
                    {book.label}
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
