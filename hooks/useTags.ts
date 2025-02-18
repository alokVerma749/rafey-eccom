import { ITag } from "@/types/tag";
import { useEffect, useState } from "react";

interface useTagPropsType {
  category: string;
}

export const useTags = ({ category }: useTagPropsType) => {
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<ITag[]>([]);

  const addTag = async () => {
    if (tagInput && !tags.includes(tagInput)) {
      try {
        const res = await fetch("/api/admin/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: tagInput, category }),
        });

        if (res.ok) {
          setTags((prev) => [...prev, tagInput]);
        }
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const removeTagGlobally = async (tagToRemove: string) => {
    try {
      const res = await fetch(`/api/admin/tags?name=${tagToRemove}&category=${category}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
      } else {
        console.error("Failed to delete tag");
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const removeTagFromSelection = async (tagToRemove: string) => {
    try {
      setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`/api/tags?category=${category}`);
        if (res.ok) {
          const data: { tags: ITag[] } = await res.json();
          setSuggestions(data.tags);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        setSuggestions([]);
      }
    };

    fetchTags();
  }, [category]);

  return {
    tags,
    setTags,
    tagInput,
    setTagInput,
    addTag,
    removeTagGlobally,
    removeTagFromSelection,
    suggestions,
  };
};
