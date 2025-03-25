import CommonBannerSection from "@/components/shared/CommonBannerSection";
import Container from "@/components/shared/Container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Fragment } from "react";
import teamMemberOne from "@/assets/team-member-01.jpg";
import teamMemberTwo from "@/assets/team-member-02.jpg";
import teamMemberThree from "@/assets/team-member-03.jpg";
import teamMemberFour from "@/assets/team-member-06.jpg";
import teamMemberFive from "@/assets/team-member-05.jpg";
import outStoryBannerImage from "@/assets/hans-jurgen-weinhardt-FZ5nx86tP2U-unsplash.jpg";

const teamMembers = [
  { url: teamMemberOne, alt: "Team Member 1" },
  { url: teamMemberTwo, alt: "Team Member 2" },
  { url: teamMemberThree, alt: "Team Member 3" },
  { url: teamMemberFour, alt: "Team Member 4" },
  { url: teamMemberFive, alt: "Team Member 5" },
];

export default function About() {
  return (
    <Fragment>
      <CommonBannerSection title="About Us" />
      <Container className="my-12 space-y-12">
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#100E18]">
            About BornoBihar
          </h3>

          <div className="space-y-12 mt-4 text-gray-800 text-lg">
            <p>
              Welcome to{" "}
              <span className="font-semibold text-primary">BornoBihar</span>,
              your premier destination for discovering, purchasing, and enjoying
              books across various genres. We strive to bridge the gap between
              readers and literary treasures, making quality books accessible to
              everyone.
            </p>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#100E18]">
                Our Story
              </h2>
              <p>
                Founded with a passion for literature, BornoBihar was
                established to create a haven for book lovers. Our journey began
                with a simple mission: to nurture a love for reading and make
                books more accessible to everyone, regardless of location or
                background.
              </p>
              <div className="w-full h-[500px] relative overflow-hidden rounded-lg ">
                <Image
                  src={outStoryBannerImage}
                  alt="Thumbnail Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#100E18]">
                Our Mission
              </h2>
              <div className="space-y-2">
                <p>
                  At BornoBihar, our mission is to transform the way book lovers
                  explore, discover, and purchase books. We are committed to
                  creating a seamless, enjoyable, and personalized online
                  book-shopping experience, catering to readers of all genres,
                  preferences, and backgrounds. Our goal is to offer a diverse
                  and carefully curated selection of books from renowned
                  authors, emerging writers, and independent publishers
                  worldwide.
                </p>
                <p>
                  Beyond just selling books, we strive to foster a passionate
                  reading community by making literature more accessible,
                  engaging, and exciting for everyone. We believe that books are
                  more than just printed words—they are gateways to knowledge,
                  imagination, and personal growth. By bridging the gap between
                  readers and quality literature, we aspire to nurture a
                  lifelong love for reading and support the continuous pursuit
                  of knowledge and self-improvement.
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#100E18]">
                Our Vision
              </h2>
              <div className="space-y-2">
                <p>
                  At BornoBihar, we envision becoming the most trusted and
                  beloved online bookshop, recognized globally for its
                  unparalleled selection, exceptional service, and commitment to
                  fostering a culture of reading. Our vision is to create a
                  literary hub where readers can immerse themselves in diverse
                  stories, broaden their horizons, and find books that inspire,
                  educate, and entertain.
                </p>
                <p>
                  We dream of a world where every individual, regardless of age,
                  location, or background, has easy access to books that ignite
                  curiosity, stimulate critical thinking, and encourage personal
                  and intellectual growth. Through continuous innovation,
                  dedicated customer support, and an unwavering passion for
                  books, we aim to empower readers, support authors, and
                  contribute to a world where the joy of reading knows no
                  boundaries.
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#100E18]">
                Our Values
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Accessibility:</strong> Making books available to
                  everyone.
                </li>
                <li>
                  <strong>Quality:</strong> Providing a handpicked collection of
                  books.
                </li>
                <li>
                  <strong>Innovation:</strong> Adapting to new technologies for
                  a better reading experience.
                </li>
                <li>
                  <strong>Customer Focus:</strong> Ensuring exceptional service
                  and satisfaction.
                </li>
              </ul>
            </div>
            <Separator />
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-[#100E18]">
                Meet the Team
              </h2>
              <p>
                Our dedicated team comprises book lovers, tech specialists, and
                customer service experts who work tirelessly to bring you the
                best reading experience possible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {teamMembers.map((teamMember, index) => (
                  <div
                    key={index}
                    className="w-full h-[320px] relative overflow-hidden rounded-lg "
                  >
                    <Image
                      src={teamMember.url}
                      alt={teamMember.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
