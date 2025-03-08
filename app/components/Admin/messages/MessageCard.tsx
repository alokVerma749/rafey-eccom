'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { MessageSquareReply, MessageSquareOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Message } from "@/types/message"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MessageCard({ msg, msgId, setMsgs }: { msg: Message, msgId: string, setMsgs: Dispatch<SetStateAction<Message[]>> }) {
  const [showReply, setShowReply] = useState(false);

  const handleDeleteMessage = async () => {
    try {
      await fetch(`/api/admin/messages?msgId=${msgId}`, {
        method: "DELETE",
      });

      // Show success toast message
      toast({ title: "Message deleted" });

      // Remove deleted message from state
      setMsgs((prevMsgs) => prevMsgs.filter((message) => message._id !== msgId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleSendReply = async () => {
    console.log('send reply');
  }

  return (
    <TooltipProvider>
      <Card className="w-full md:w-[90%] m-4 mx-auto shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle>{msg.name}</CardTitle>
          <div className="flex sm:flex-row justify-between items-start">
            <CardDescription>{msg.email}</CardDescription>
            <CardDescription>
              {new Date(msg.createdAt).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {msg.message}
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-center">
          <div className="flex justify-between items-center w-full">
            {/* Reply button with tooltip */}
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => setShowReply(true)}
                  className="flex justify-start items-center cursor-pointer text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-100"
                >
                  <MessageSquareReply className="h-5 w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Reply to Message</TooltipContent>
            </Tooltip>

            {/* Delete button with tooltip */}
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={handleDeleteMessage}
                  className="flex justify-start items-center cursor-pointer text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-100"
                >
                  <MessageSquareOff className="h-5 w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Delete Message</TooltipContent>
            </Tooltip>
          </div>

          {/* Reply textarea and buttons */}
          {showReply && (
            <div className="grid w-full gap-2 mt-4">
              <Textarea placeholder="Type your message here." />
              <div className="flex justify-between items-center">
                <Button className="w-fit px-10" variant="outline" onClick={() => setShowReply(false)}>Cancel</Button>
                <Button className="w-fit px-10" onClick={handleSendReply}>Reply</Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}
