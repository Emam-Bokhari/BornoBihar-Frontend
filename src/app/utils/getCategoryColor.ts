type CategoryType =
    | "fiction"
    | "nonFiction"
    | "academic"
    | "philosophy"
    | "children"
    | "science"
    | "religion"
    | "history"
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

export const getCategoryColor = (category: CategoryType | undefined) => {
    const colors: Record<CategoryType, string> = {
        fiction: "bg-purple-500 text-white",
        nonFiction: "bg-blue-500 text-white",
        academic: "bg-green-500 text-white",
        philosophy: "bg-yellow-500 text-black",
        children: "bg-pink-500 text-white",
        science: "bg-indigo-500 text-white",
        religion: "bg-red-500 text-white",
        history: "bg-orange-500 text-white",
        biography: "bg-teal-500 text-white",
        art: "bg-rose-500 text-white",
        poetry: "bg-violet-500 text-white",
        romance: "bg-pink-400 text-white",
        mystery: "bg-gray-700 text-white",
        fantasy: "bg-purple-700 text-white",
        travel: "bg-blue-400 text-white",
        selfHelp: "bg-green-400 text-white",
        psychology: "bg-indigo-600 text-white",
        politics: "bg-red-600 text-white",
        cookbook: "bg-amber-500 text-black",
        humor: "bg-yellow-400 text-black",
        graphicNovels: "bg-cyan-500 text-white",
        health: "bg-lime-500 text-black",
        technology: "bg-gray-900 text-white",
        business: "bg-blue-600 text-white",
        education: "bg-green-600 text-white",
        sports: "bg-orange-600 text-white",
    };

    return category && colors[category] ? colors[category] : "bg-gray-500 text-white";
};