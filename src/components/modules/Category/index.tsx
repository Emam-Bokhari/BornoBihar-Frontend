import Container from "@/components/shared/Container";
import { Fragment } from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "fiction",
    label: "Fiction",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743231882/liana-s-YTARtmDMyyE-unsplash_q0s1f9.jpg",
  },
  {
    title: "nonFiction",
    label: "Non Fiction",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743231967/patri-cimpan-gN4YWlYX51k-unsplash_zylnpr.jpg",
  },
  {
    title: "academic",
    label: "Academic",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232013/saung-digital-8fEhFK1qhvQ-unsplash_uyesxq.jpg",
  },
  {
    title: "philosophy",
    label: "Philosophy",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232110/gabriella-clare-marino-Hx8HaI4ERkA-unsplash_nnqe9x.jpg",
  },
  {
    title: "children",
    label: "Children",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232154/josh-applegate-p_KJvKVsH14-unsplash_w5tfc7.jpg",
  },
  {
    title: "science",
    label: "Science",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232252/national-cancer-institute-L7en7Lb-Ovc-unsplash_zttzzp.jpg",
  },
  {
    title: "religion",
    label: "Religion",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232302/muhammad-amaan-Sbae5FbFhuI-unsplash_x6yil6.jpg",
  },
  {
    title: "history",
    label: "History",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232355/the-new-york-public-library-5lpbC64r3Z4-unsplash_myshy7.jpg",
  },
  {
    title: "biography",
    label: "Biography",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232407/europeana-sC372bUnZWM-unsplash_u2ivnj.jpg",
  },
  {
    title: "art",
    label: "Art",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232489/yiran-yang-R4SAAfhBg4s-unsplash_qelqhb.jpg",
  },
  {
    title: "poetry",
    label: "Poetry",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232551/alvaro-serrano-hjwKMkehBco-unsplash_tdyy5g.jpg",
  },
  {
    title: "romance",
    label: "Romance",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232562/elin-melaas-kBDBb88S0fE-unsplash_sakugy.jpg",
  },
  {
    title: "mystery",
    label: "Mystery",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232631/remi-skatulski-bhE2HWhO9U0-unsplash_w3qlnv.jpg",
  },
  {
    title: "fantasy",
    label: "Fantasy",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232646/jr-korpa-JKRL7ofWWAA-unsplash_pqj7i0.jpg",
  },
  {
    title: "travel",
    label: "Travel",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232675/dino-reichmuth-A5rCN8626Ck-unsplash_db6xnq.jpg",
  },
  {
    title: "selfHelp",
    label: "Self Help",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232754/youssef-naddam-iJ2IG8ckCpA-unsplash_ykwqsa.jpg",
  },
  {
    title: "psychology",
    label: "Psychology",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232743/alicia-christin-gerald-zm4CcBeBbp8-unsplash_ohcotp.jpg",
  },
  {
    title: "politics",
    label: "Politics",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232819/marco-oriolesi-wqLGlhjr6Og-unsplash_puvnyy.jpg",
  },
  {
    title: "cookbook",
    label: "Cookbook",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232826/or-hakim-S2Eql9vHN3o-unsplash_jqy472.jpg",
  },
  {
    title: "humor",
    label: "Humor",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232910/matt-busse-7mRAXmLgOoE-unsplash_aik5dx.jpg",
  },
  {
    title: "graphicNovels",
    label: "GraphicNovels",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743233016/bp-miller-h7aH-ouZhnI-unsplash_rzx5gn.jpg",
  },
  {
    title: "health",
    label: "Health",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743232910/online-marketing-hIgeoQjS_iE-unsplash_l5nqbp.jpg",
  },
  {
    title: "technology",
    label: "Technology",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743233011/umberto-jXd2FSvcRr8-unsplash_awtojg.jpg",
  },
  {
    title: "business",
    label: "Business",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743233116/hunters-race-MYbhN8KaaEc-unsplash_zj0hvq.jpg",
  },
  {
    title: "education",
    label: "Education",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743233117/unseen-studio-s9CC2SKySJM-unsplash_nmorwx.jpg",
  },
  {
    title: "sports",
    label: "Sports",
    image:
      "https://res.cloudinary.com/dvpqm6zct/image/upload/v1743233186/jannes-glas-0NaQQsLWLkA-unsplash_qkf760.jpg",
  },
];

export default async function AllCategories() {
  return (
    <Fragment>
      <Container className="my-12">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories?.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
