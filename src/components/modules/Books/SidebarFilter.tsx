export default function SidebarFilter({
  selectedCategories,
  setSelectedCategories,
  setIsAvailable,
  priceRange,
  setPriceRange,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}) {
  const categories = [
    "fiction",
    "nonFiction",
    "academic",
    "philosophy",
    "children",
    "science",
    "religion",
    "history",
    "biography",
    "art",
    "poetry",
    "romance",
    "mystery",
    "fantasy",
    "travel",
    "selfHelp",
    "psychology",
    "politics",
    "cookbook",
    "humor",
    "graphicNovels",
    "health",
    "technology",
    "business",
    "education",
    "sports",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]); // Update the range dynamically
  };

  return (
    <div className="w-64 px-4 space-y-4 border-2 border-[#EBEBEB]">
      {/* Genre Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Genre</h2>
        <div className="space-y-2">
          {/* Genre Options */}
          <ul className="text-gray-600 space-y-1">
            {categories.map((item, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(item)}
                  onChange={() => toggleCategory(item)}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price Range Filter */}
      {/* Price Range Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Price Range</h2>
        <div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            className="w-full accent-[#F65D4E]"
            value={priceRange[1]} // Correctly access the second value of priceRange
            onChange={handlePriceChange}
          />
          <div className="flex justify-between text-sm">
            <span>0</span>
            <span>{priceRange[1]}</span> {/* Correctly display max price */}
          </div>
        </div>
      </div>
      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold text-[#1F2937] mb-2">InStock</h3>
        <ul className="text-gray-600 space-y-1">
          <li className="flex items-center">
            <input
              onChange={toggleAvailability}
              type="checkbox"
              className="mr-2"
            />
            Stock
          </li>
        </ul>
      </div>
    </div>
  );
}
