'use client';

import React, { useEffect, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ISubCategory } from "@/types/sub_category";
import { ITag } from "@/types/tag";

const ManageTags = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});
  const [expandedSubCategories, setExpandedSubCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchTags();
    fetchSubCategories();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/admin/tags");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch("/api/admin/sub_category");
      const data = await response.json();
      setSubCategories(data.subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const deleteTag = async (name: string, category: string) => {
    try {
      await fetch(`/api/admin/tags?name=${name}&category=${category}`, {
        method: "DELETE",
      });
      toast({title: "Tag deleted"});
      setTags(tags.filter(tag => tag.name !== name));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const deleteSubCategory = async (name: string, category: string) => {
    try {
      await fetch(`/api/admin/sub_category?name=${name}&category=${category}`, {
        method: "DELETE",
      });
      toast({title: "Subcategory deleted"});
      setSubCategories(subCategories.filter(sub => sub.name !== name));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const toggleCategory = (category: string, type: "tags" | "subcategories") => {
    if (type === "tags") {
      setExpandedTags(prev => ({ ...prev, [category]: !prev[category] }));
    } else {
      setExpandedSubCategories(prev => ({ ...prev, [category]: !prev[category] }));
    }
  };

  return (
    <div className="flex gap-8 p-6 min-h-screen overflow-y-auto w-full font-marcellus bg-gray-100">
    {/* Tags Section */}
    <div className="w-1/2 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Tags</h2>
      {Object.entries(
        tags.reduce((acc, tag) => {
          acc[tag.category] = [...(acc[tag.category] || []), tag];
          return acc;
        }, {} as Record<string, ITag[]>)
      ).map(([category, categoryTags]) => (
        <div key={category} className="mb-2 border rounded overflow-hidden">
          <button
            className="w-full flex font-marcellus justify-between items-center bg-gray-200 p-2 font-semibold text-gray-700 hover:bg-gray-300 transition-all"
            onClick={() => toggleCategory(category, "tags")}
          >
            {category} ({categoryTags.length})
            {expandedTags[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedTags[category] && (
            <div className="p-2 overflow-y-scroll max-h-64">
              {categoryTags.map(({ name }) => (
                <div key={name} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                  <span>{name}</span>
                  <button className="text-red-500 hover:text-red-700" onClick={() => deleteTag(name, category)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Subcategories Section */}
    <div className="w-1/2 bg-white shadow-lg rounded-lg p-4 overflow-y-auto ">
      <h2 className="text-lg font-bold mb-4">Subcategories</h2>
      {Object.entries(
        subCategories.reduce((acc, sub) => {
          acc[sub.category] = [...(acc[sub.category] || []), sub];
          return acc;
        }, {} as Record<string, ISubCategory[]>)
      ).map(([category, categorySubs]) => (
        <div key={category} className="mb-2 border rounded overflow-hidden">
          <button
            className="w-full flex justify-between items-center bg-gray-200 p-2 font-semibold text-gray-700 hover:bg-gray-300 transition-all"
            onClick={() => toggleCategory(category, "subcategories")}
          >
            {category} ({categorySubs.length})
            {expandedSubCategories[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSubCategories[category] && (
            <div className="p-2 overflow-y-scroll max-h-64">
              {categorySubs.map(({ name }) => (
                <div key={name} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                  <span>{name}</span>
                  <button className="text-red-500 hover:text-red-700" onClick={() => deleteSubCategory(name, category)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
};

export default ManageTags;
