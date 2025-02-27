'use client';

import { MessageCard } from "@/app/components/Admin/messages/MessageCard";
import { useEffect, useState } from "react";
import { Message } from "@/types/message";
import { SearchMessage } from "@/app/components/Admin/messages/SearchMessage";

const ManageTags = () => {
  const [msgs, setMsgs] = useState<Message[]>([]);

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
    <div className="p-6 min-h-screen overflow-y-auto w-full font-bellefair">
      <SearchMessage msgs={msgs} />
      {msgs.map((msg) => (
        <MessageCard key={msg?._id} msg={msg} />
      ))}
    </div>
  );
};

export default ManageTags;
