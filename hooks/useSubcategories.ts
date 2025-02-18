import { ISubCategory } from "@/types/sub_category";
import { useEffect, useState } from "react";

interface useTagPropsType {
  category: string;
}

export const useSubCategories = ({ category }: useTagPropsType) => {
  const [subCategoryInput, setSubCategoryInput] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [sub_category_suggestions, set_sub_category_Suggestions] = useState<ISubCategory[]>([]);

  const addSubCategory = async () => {
    if (subCategoryInput && !subCategories.includes(subCategoryInput)) {
      try {
        const res = await fetch("/api/admin/sub_category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: subCategoryInput, category }),
        });

        if (res.ok) {
          setSubCategories((prev) => [...prev, subCategoryInput]);
        }
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    }
  };

  const removeSubCategoryGlobally = async (subCategoryToRemove: string) => {
    try {
      const res = await fetch(`/api/admin/sub_category?name=${subCategoryToRemove}&category=${category}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setSubCategories((prev) => prev.filter((subCategory) => subCategory !== subCategoryToRemove));
      } else {
        console.error("Failed to delete subcategory");
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const removeSubCategoryFromSelection = async (subCategoryToRemove: string) => {
    try {
      setSubCategories((prev) => prev.filter((subCategory) => subCategory !== subCategoryToRemove));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  // fetching suggestions
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`/api/sub_category?category=${category}`);
        if (res.ok) {
          const data: { subCategories: ISubCategory[] } = await res.json();
          set_sub_category_Suggestions(data.subCategories);
        } else {
          set_sub_category_Suggestions([]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        set_sub_category_Suggestions([]);
      }
    };

    fetchSubCategories();
  }, [category]);

  return {
    subCategories,
    subCategoryInput,
    setSubCategoryInput,
    addSubCategory,
    removeSubCategoryGlobally,
    removeSubCategoryFromSelection,
    sub_category_suggestions,
    setSubCategories
  };
};
