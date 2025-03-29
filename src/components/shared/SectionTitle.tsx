import { Fragment } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function SectionTitle({
  title,
  viewAllUrl,
}: {
  title: string;
  viewAllUrl: string;
}) {
  return (
    <Fragment>
      <div className="flex items-center justify-between space-x-4">
        <p className="flex-grow text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap">
          {title}
        </p>
        <div className="flex-grow-0 w-full mx-20 hidden md:block">
          <Separator className="w-full" />
        </div>
        <div className="flex-grow-0">
          <Link href={viewAllUrl}>
            <Button className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white rounded-full cursor-pointer">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
