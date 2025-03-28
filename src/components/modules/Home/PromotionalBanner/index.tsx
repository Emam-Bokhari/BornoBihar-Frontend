import GiftBoxBanner from "./GiftBoxBanner";

import Container from "@/components/shared/Container";
import NovelDiscountBanner from "./NovelDiscountBanner";

export default function PromotionalBanner() {
  return (
    <Container className="flex flex-col xl:flex-row gap-4 my-12">
      <GiftBoxBanner />
      <NovelDiscountBanner />
    </Container>
  );
}
