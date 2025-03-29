// components/BlogCard.js
import Image from "next/image";

const BlogCard = () => {
  const blogData = {
    imageUrl:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg", // Replace with your image path (place in public folder)
    date: "November 14, 2022",
    author: "Huongdo",
    title: "5 Attractive Bookstore WordPress Themes",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat [...]",
    category: "Uncategorized",
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="w-full h-[200px] md:h-[400px] relative overflow-hidden rounded-lg ">
        <Image
          src={blogData?.imageUrl}
          alt="Thumbnail Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2 text-sm text-[#8a8a8a]">
          <span>{blogData.date}</span>
          <span>By {blogData.author}</span>
        </div>
        <h2 className="text-2xl font-bold text-[#100E18] mb-2">
          {blogData.title}
        </h2>
        <p className="text-[#100E18] mb-4">{blogData.excerpt}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            {blogData.category}
          </span>
          <a
            href="#"
            className="text-[#F65D4E] hover:text-[#D84C3F] hover:underline "
          >
            Read More ›
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
