// components/RecentPosts.js
import Image from "next/image";

const RecentPosts = () => {
  const posts = [
    {
      imageUrl:
        "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg", // আপনার ছবির পাথ এখানে দিন
      date: "NOVEMBER 14, 2022",
      title: "5 Attractive Bookstore WordPress Themes",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg",
      date: "FEBRUARY 11, 2022",
      title: "Behind the Scenes with Author Victoria Aveyard",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg",
      date: "FEBRUARY 11, 2022",
      title: "Oprah's Latest Book Club Pick is Being Adapted for TV!",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg",
      date: "FEBRUARY 11, 2022",
      title: "7 Books to Combat Racism",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743224077/logan-gutierrez-TDJkMUxWYSI-unsplash_hnbmjy.jpg",
      date: "FEBRUARY 11, 2022",
      title: "Top 10 Books to Make It a Great Year",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg  w-full max-w-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li
            key={index}
            className={`flex items-start mb-4 ${
              index !== posts.length - 1 ? "border-b border-gray-200 pb-4" : ""
            }`}
          >
            <div className="w-26 h-20 relative mr-4 flex-1">
              <Image
                src={post.imageUrl}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-1/3">
              <span className="text-xs text-[#8a8a8a]">{post.date}</span>
              <p className="text-sm font-semibold text-[#100E18]">
                {post.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
