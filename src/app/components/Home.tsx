import { useNavigate } from "react-router";
import { Search as SearchIcon, Clock, ChefHat, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import foodImage1 from "../../imports/pexels-andres-segura-325933894-14454470.jpg";
import foodImage2 from "../../imports/pexels-peep-this-photo-1766934996-31846711.jpg";
import foodImage3 from "../../imports/thai-food-tom-yum-kung-river-prawn-spicy-soup.jpg";
import foodImage4 from "../../imports/top-view-table-full-food.jpg";
import foodImage5 from "../../imports/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table.jpg";

const TOP_DISHES = [
  {
    id: 1,
    name: "Tom Yum Kung",
    image: foodImage3,
    cookTime: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    searches: "12.5k"
  },
  {
    id: 2,
    name: "Penne Pasta Pomodoro",
    image: foodImage5,
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.9,
    searches: "18.2k"
  },
  {
    id: 3,
    name: "Gourmet Feast",
    image: foodImage4,
    cookTime: "45 min",
    difficulty: "Hard",
    rating: 4.7,
    searches: "9.8k"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    image: foodImage1,
    review: "Food Searcher has completely changed how I plan meals! The ingredient filter saves me so much time.",
    rating: 5
  },
  {
    id: 2,
    name: "James Chen",
    image: foodImage2,
    review: "Love being able to search by cook time. Perfect for busy weeknights when I need something quick!",
    rating: 5
  }
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <header className="text-center py-12 md:py-20 px-4">
        <h1 className="text-5xl md:text-7xl mb-6 text-orange-900">Food Searcher</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover delicious recipes based on ingredients, cooking time, and method
        </p>
        <button
          onClick={() => navigate("/search")}
          className="bg-orange-600 hover:bg-orange-700 text-white py-4 px-12 rounded-full text-xl flex items-center justify-center gap-3 mx-auto transition-colors shadow-lg hover:shadow-xl"
        >
          <SearchIcon size={24} />
          Start Searching
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Top Dishes Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl mb-8 text-center text-gray-900">Top Searched Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_DISHES.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => navigate("/search")}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl mb-3 text-gray-900">{dish.name}</h3>
                  <div className="flex items-center gap-4 mb-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={18} />
                      <span>{dish.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat size={18} />
                      <span>{dish.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={18} fill="currentColor" />
                      <span className="text-gray-900">{dish.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{dish.searches} searches</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-3xl md:text-4xl mb-8 text-center text-gray-900">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900">{testimonial.name}</h3>
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
