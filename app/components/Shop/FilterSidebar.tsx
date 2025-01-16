'use client'; 

import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel} from "@/components/ui/sidebar";

const filters = [
  {
    title: "Brand",
    type: "checkbox",
    options: [
      { label: "India Meets India", value: "india-meets-india" },
      { label: "India Classic Art", value: "india-classic-art" },
    ],
  },
  {
    title: "Price",
    type: "range",
    min: 900,
    max: 6500,
    step: 100,
  },
  {
    title: "Color",
    type: "radio",
    options: [
      { label: "Brown", value: "brown" },
      { label: "White", value: "white" },
      { label: "Black", value: "black" },
    ],
  },
  {
    title: "Discount Range",
    type: "radio",
    options: [
      { label: "20% and above", value: "20-and-above" },
      { label: "40% and above", value: "40-and-above" },
    ],
  },
];

export function FilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any }>({});

  const handleFilterChange = (filterTitle: string, value: string, type: string) => {
    if (type === "checkbox") {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterTitle]: prev[filterTitle]?.includes(value)
          ? prev[filterTitle].filter((v: string) => v !== value)
          : [...(prev[filterTitle] || []), value],
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterTitle]: value,
      }));
    }
  };

  const clearAllFilters = () => setSelectedFilters({});

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <div className="text-base font-medium">Filter</div>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {filters.map((filter) => (
              <div key={filter.title} className="mb-4">
                <h3 className="font-semibold mb-2">{filter.title}</h3>
                {filter.type === "checkbox" &&
                  filter.options &&
                  filter.options.map((option) => (
                    <div key={option.value} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={option.value}
                        value={option.value}
                        checked={
                          selectedFilters[filter.title]?.includes(option.value) || false
                        }
                        onChange={(e) =>
                          handleFilterChange(filter.title, e.target.value, filter.type)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}
                {filter.type === "radio" &&
                  filter.options &&
                  filter.options.map((option) => (
                    <div key={option.value} className="flex items-center mb-1">
                      <input
                        type="radio"
                        id={option.value}
                        name={filter.title}
                        value={option.value}
                        checked={selectedFilters[filter.title] === option.value}
                        onChange={(e) =>
                          handleFilterChange(filter.title, e.target.value, filter.type)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}
                {filter.type === "range" && (
                  <>
                    <input
                      type="range"
                      min={filter.min}
                      max={filter.max}
                      step={filter.step}
                      value={selectedFilters[filter.title] || filter.min}
                      onChange={(e) =>
                        handleFilterChange(filter.title, e.target.value, filter.type)
                      }
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                      ₹{filter.min} - ₹{selectedFilters[filter.title] || filter.max}
                    </p>
                  </>
                )}
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
