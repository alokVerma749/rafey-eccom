'use client';

import { useState } from "react";
import Image from "next/image";
import image1 from "@/public/asset/image51.png";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function Section6() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({ title: "Message sent successfully" });
        reset();
      } else {
        toast({ title: "Failed to send message" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "An error occurred. Please try again." });
    } finally {
      setTimeout(() => setIsSubmitted(false), 3000); // Enable button after 3 seconds
    }
  };

  return (
    <div className="flex-1 flex-col md:flex-row justify-between items-center gap-4 relative pb-10 md:p-10 text-white font-marcellus font-medium">
      <Image height={200} width={200} src={image1.src} alt="" className="h-[70vh] md:w-[60vw] w-full my-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="block md:absolute h-[50vh] right-10 top-20 md:w-5/12 shadow-2xl p-4 border-2 bg-[#f7f4ef] rounded">
        <div className="flex flex-col items-start w-full gap-4">
          <div className="flex flex-col justify-start items-between gap-4 space-y-1.5 w-full">
            <Input
              id="name"
              placeholder="Name"
              className="w-full bg-[#fafafa] text-black"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            <Input
              id="email"
              placeholder="Email"
              className="w-full text-black"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            <textarea
              id="message"
              placeholder="Message"
              className="w-full h-32 text-start bg-[#fafafa] text-black p-2 rounded resize-none"
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && <span className="text-red-500">{errors.message.message}</span>}
          </div>
          <button type="submit" disabled={isSubmitted} className="bg-[#28166f] w-fit p-2 rounded disabled:bg-gray-400">
            {isSubmitted ? "Sent!" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Section6;
