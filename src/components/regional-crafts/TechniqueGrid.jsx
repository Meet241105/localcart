import { useState } from "react";

export function TechniqueGrid({ techniques, activeTab, onTabChange }) {
  return (
    <div className="space-y-6">
      {/* Technique Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {["All", ...techniques.map((t) => t.name)].map((technique) => (
          <button
            key={technique}
            onClick={() => onTabChange(technique)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === technique
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {technique}
          </button>
        ))}
      </div>

      {/* Technique Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === "All"
          ? techniques.flatMap((t) => t.products)
          : techniques.find((t) => t.name === activeTab)?.products || []
        ).map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {product.technique}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-semibold">
                  From ₹{product.price}
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
