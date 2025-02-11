import React from "react";
import "tailwindcss/tailwind.css";

type MarqueeProps = {
  messages: string[];
};

export const Marquee: React.FC<MarqueeProps> = ({ messages }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap font-bellefair bg-gradient-to-r from-black via-gray-900 to-black shadow-lg">
      <div className="flex space-x-10 animate-marquee">
        {messages.concat(messages).map((msg, index) => (
          <span key={index} className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 tracking-wide italic flex items-center">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};
