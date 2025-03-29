import Container from "@/components/shared/Container";
import Image from "next/image";
import { Fragment } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";
import { TBlog } from "@/types";
import moment from "moment-timezone";
import { Badge } from "@/components/ui/badge";

export default function BlogDetails({ blog }: { blog: TBlog }) {
  const badgeColors = [
    { base: "bg-blue-100 text-blue-800", hover: "hover:bg-blue-200" },
    { base: "bg-green-100 text-green-800", hover: "hover:bg-green-200" },
    { base: "bg-yellow-100 text-yellow-800", hover: "hover:bg-yellow-200" },
    { base: "bg-purple-100 text-purple-800", hover: "hover:bg-purple-200" },
    { base: "bg-pink-100 text-pink-800", hover: "hover:bg-pink-200" },
    { base: "bg-indigo-100 text-indigo-800", hover: "hover:bg-indigo-200" },
    { base: "bg-teal-100 text-teal-800", hover: "hover:bg-teal-200" },
  ];

  const getRandomColor = () =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)];

  return (
    <Fragment>
      <Container>
        {/* Thumbnail Image */}
        <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] ">
          <Image
            src={blog?.thumbnail}
            alt={`${blog?.title} - thumbnail image`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* author info and date*/}
        <div className="flex gap-8 items-center mt-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://res.cloudinary.com/dvpqm6zct/image/upload/v1742736505/user_ug5gxm.png"
                alt="user icon"
              />
              <AvatarFallback className="text-lg">Author</AvatarFallback>
            </Avatar>
            <p className="text-sm text-[#8a8a8a]">
              by <span className="underline">{blog?.authorName}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <Calendar size={18} />
            <p className="text-sm text-[#8a8a8a]">
              {moment(blog?.createdAt).format("DD MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-4 mb-12">
          {/* title */}
          <h3 className="text-lg font-medium">{blog?.title}</h3>
          {/* introduction */}
          <p className="text-base text-[#100E18] leading-7">
            {blog?.introduction}
          </p>
          {/* main content */}
          <p className="text-lg text-[#100E18] leading-7">
            {blog?.mainContent}
          </p>
          {/* tags */}
          {blog?.tags?.length ? (
            <div className="flex gap-4 md:items-center">
              <h3 className="text-lg font-semibold">Tags:</h3>
              <div className="flex gap-4 flex-wrap">
                {blog?.tags?.map((tag, index) => {
                  const color = getRandomColor();
                  return (
                    <Badge
                      key={index}
                      className={`${color.base} ${color.hover} px-3 py-1 rounded-md transition-all`}
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Fragment>
  );
}
