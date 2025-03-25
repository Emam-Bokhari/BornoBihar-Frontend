import { Fragment } from "react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import FeaturedBookCard from "./FeaturedBookCard";

export default function FeaturedBooks() {
  return (
    <Fragment>
      <Container className="mt-12">
        <SectionTitle title="Featured Books" viewAllUrl="/books" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <FeaturedBookCard key={index} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
