import { useState } from "react";
import { useNavigate } from "react-router";
import { Search as SearchIcon, X, SlidersHorizontal, Home as HomeIcon, Clock, ChefHat, Star } from "lucide-react";

import foodImage3 from "../../imports/thai-food-tom-yum-kung-river-prawn-spicy-soup.jpg";
import foodImage4 from "../../imports/top-view-table-full-food.jpg";
import foodImage5 from "../../imports/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table.jpg";

const MOCK_ITEMS = [
  { id: 1, title: "Tom Yum Kung", tags: ["seafood", "spicy", "thai"], cookTime: "30 min", cookMethod: "Boiling", image: foodImage3, rating: 4.8 },
  { id: 2, title: "Penne Pasta Pomodoro", tags: ["pasta", "italian", "tomato"], cookTime: "25 min", cookMethod: "Boiling", image: foodImage5, rating: 4.9 },
  { id: 3, title: "Gourmet Feast", tags: ["chicken", "vegetables", "mixed"], cookTime: "45 min", cookMethod: "Baking", image: foodImage4, rating: 4.7 },
  { id: 4, title: "Spicy Thai Curry", tags: ["curry", "spicy", "thai"], cookTime: "40 min", cookMethod: "Simmering", image: foodImage3, rating: 4.6 },
  { id: 5, title: "Classic Carbonara", tags: ["pasta", "italian", "creamy"], cookTime: "20 min", cookMethod: "Boiling", image: foodImage5, rating: 4.8 },
  { id: 6, title: "Mediterranean Bowl", tags: ["vegetables", "healthy", "mixed"], cookTime: "35 min", cookMethod: "Roasting", image: foodImage4, rating: 4.5 },
  { id: 7, title: "Shrimp Pad Thai", tags: ["seafood", "thai", "noodles"], cookTime: "25 min", cookMethod: "Stir-frying", image: foodImage3, rating: 4.7 },
  { id: 8, title: "Baked Ziti", tags: ["pasta", "italian", "cheese"], cookTime: "50 min", cookMethod: "Baking", image: foodImage5, rating: 4.6 },
  { id: 9, title: "Chicken Tikka Masala", tags: ["chicken", "indian", "spicy"], cookTime: "45 min", cookMethod: "Simmering", image: foodImage4, rating: 4.9 },
  { id: 10, title: "Green Curry", tags: ["curry", "thai", "vegetables"], cookTime: "35 min", cookMethod: "Simmering", image: foodImage3, rating: 4.5 },
  { id: 11, title: "Lasagna Bolognese", tags: ["pasta", "italian", "beef"], cookTime: "60 min", cookMethod: "Baking", image: foodImage5, rating: 4.8 },
  { id: 12, title: "Roasted Vegetable Medley", tags: ["vegetables", "healthy", "vegan"], cookTime: "30 min", cookMethod: "Roasting", image: foodImage4, rating: 4.4 },
];

const COOK_TIMES = ["All", "Under 30 min", "30-45 min", "45-60 min", "Over 60 min"];
const COOK_METHODS = ["All", "Boiling", "Baking", "Simmering", "Stir-frying", "Roasting", "Grilling"];

export function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCookTime, setSelectedCookTime] = useState("All");
  const [selectedCookMethod, setSelectedCookMethod] = useState("All");
  const [showFilters, setShowFilters] = useState(true);

  const allTags = Array.from(new Set(MOCK_ITEMS.flatMap((item) => item.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag));

    const matchesCookTime = (() => {
      if (selectedCookTime === "All") return true;
      const time = parseInt(item.cookTime);
      if (selectedCookTime === "Under 30 min") return time < 30;
      if (selectedCookTime === "30-45 min") return time >= 30 && time <= 45;
      if (selectedCookTime === "45-60 min") return time > 45 && time <= 60;
      if (selectedCookTime === "Over 60 min") return time > 60;
      return true;
    })();

    const matchesCookMethod = selectedCookMethod === "All" || item.cookMethod === selectedCookMethod;

    return matchesSearch && matchesTags && matchesCookTime && matchesCookMethod;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-orange-100 rounded-lg transition-colors text-orange-900"
              aria-label="Go home"
            >
              <HomeIcon size={24} />
            </button>
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:w-80 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-gray-900">Filters</h2>
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setSelectedCookTime("All");
                    setSelectedCookMethod("All");
                    setSearchQuery("");
                  }}
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  Clear All
                </button>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-gray-900 flex items-center gap-2">
                  <Clock size={18} />
                  Cook Time
                </h3>
                <div className="space-y-2">
                  {COOK_TIMES.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedCookTime(time)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCookTime === time
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-gray-900 flex items-center gap-2">
                  <ChefHat size={18} />
                  Cooking Method
                </h3>
                <div className="space-y-2">
                  {COOK_METHODS.map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedCookMethod(method)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCookMethod === method
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-gray-900">Difficulty Level</h3>
                <div className="space-y-2">
                  {["Easy", "Medium", "Hard"].map((difficulty) => (
                    <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-orange-600" />
                      <span>{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-gray-900 flex items-center gap-2">
                  <Star size={18} />
                  Rating
                </h3>
                <div className="space-y-2">
                  {["4.5+ Stars", "4+ Stars", "3+ Stars"].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-orange-600" />
                      <span>{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h3 className="mb-3 text-gray-900">Ingredient Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                      selectedTags.includes(tag)
                        ? "bg-orange-600 text-white"
                        : "bg-white border border-gray-300 hover:border-orange-600"
                    }`}
                  >
                    {tag}
                    {selectedTags.includes(tag) && <X size={16} />}
                  </button>
                ))}
              </div>

              <p className="text-gray-600">
                {filteredItems.length} recipe{filteredItems.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl mb-3 text-gray-900">{item.title}</h3>
                    <div className="flex items-center gap-4 mb-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span className="text-sm">{item.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat size={16} />
                        <span className="text-sm">{item.cookMethod}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-900">{item.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://example.com/recipe-page"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-block text-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      View Recipe
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-xl mb-4">No recipes found</p>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
