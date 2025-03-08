'use client';

import { useEffect, useState } from "react";
import { MessageCard } from "@/app/components/Admin/messages/MessageCard";
import { Message } from "@/types/message";

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

  return (
    <div className="p-6 min-h-screen overflow-y-auto w-full font-bellefair">
      {msgs.map((msg) => (
        <MessageCard key={msg?._id} msg={msg} msgId={msg?._id} setMsgs={setMsgs} />
      ))}
    </div>
  );
};

export default ManageTags;
