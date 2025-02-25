'use client';

import { useEffect, useState } from "react";

const ManageTags = () => {
  const [msgs, setMsgs] = useState<[]>([]);

  const fetchMsgs = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      const data = await response.json();
      setMsgs(data.msg);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchMsgs();
  }, []);

  console.log(msgs, '###');

  // const deleteMessage = async (name: string, category: string) => {
  //   try {
  //     await fetch(`/api/admin/tags?name=${name}&category=${category}`, {
  //       method: "DELETE",
  //     });
  //     toast({ title: "Tag deleted" });
  //     setTags(tags.filter(tag => tag.name !== name));
  //   } catch (error) {
  //     console.error("Error deleting tag:", error);
  //   }
  // };

  return (
    <div className="flex gap-8 p-6 min-h-screen overflow-y-auto w-full font-bellefair bg-gray-100">
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Messages</h2>

      </div>
    </div>
  );
};

export default ManageTags;
