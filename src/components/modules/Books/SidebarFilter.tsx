export default function SidebarFilter() {
  return (
    <div className="w-64 px-4 space-y-4">
      {/* Genre Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Genre</h2>
        <div className="space-y-2">
          {/* Genre Options */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#F65D4E] focus:ring-[#F65D4E]"
            />
            <span>Action & Adventure</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#F65D4E] focus:ring-[#F65D4E]"
            />
            <span>Activity Books</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#F65D4E] focus:ring-[#F65D4E]"
            />
            <span>Animals</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#F65D4E] focus:ring-[#F65D4E]"
            />
            <span>Anthologies</span>
          </label>
          {/* Add more genres here... */}
        </div>
      </div>

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
            id="priceRange"
          />
          <div className="flex justify-between text-sm">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
