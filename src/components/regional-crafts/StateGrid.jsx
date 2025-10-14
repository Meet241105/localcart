import { useState } from "react";

export function StateGrid({ states, activeTab, onTabChange }) {
  return (
    <div className="space-y-6">
      {/* State Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {states.map((state) => (
          <button
            key={state.name}
            onClick={() => onTabChange(state.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === state.name
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {state.name}
          </button>
        ))}
      </div>

      {/* State Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {states
          .find((state) => state.name === activeTab)
          ?.crafts.map((craft, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {craft.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {craft.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {craft.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 font-semibold">
                    From ₹{craft.price}
                  </span>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
