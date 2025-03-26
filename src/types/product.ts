export type TProduct = {
    _id: string;
    title: string;
    category:
    | 'fiction'
    | 'nonFiction'
    | 'academic'
    | 'philosophy'
    | 'children'
    | 'science'
    | 'religion'
    | 'history'
    | "biography"
    | "art"
    | "poetry"
    | "romance"
    | "mystery"
    | "fantasy"
    | "travel"
    | "selfHelp"
    | "psychology"
    | "politics"
    | "cookbook"
    | "humor"
    | "graphicNovels"
    | "health"
    | "technology"
    | "business"
    | "education"
    | "sports";
    author: string;
    aboutAuthor: string;
    shipping: string;
    returnsPolicy: string;
    termsOfSale: string;
    description: string;
    price: number;
    images: string[];
    publisher: string;
    publishedDate: Date;
    edition?: string;
    language:
    | 'bengali'
    | 'english'
    | 'arabic'
    | 'hindi'
    | 'spanish'
    | 'french'
    | 'german' | "italian" | "portuguese" | "russian" | "chinese" | "japanese" | "korean" | "turkish" | "urdu" | "swedish" | "dutch" | "polish" | "greek" | "hebrew" | "persian" | "thai" | "vietnamese";
    pages?: number;
    rating: number;
    discount?: number;
    format: 'hardcover' | 'paperback' | 'eBook' | 'audioBook' | "pdf" | "audiobookMP3" | "audiobookCD" | "comicBook" | "interactiveBook" | "flipBook" | "boxSet" | "deluxeEdition";
    quantity: number;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
};
