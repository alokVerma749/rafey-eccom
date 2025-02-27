'use client'

import { useState } from "react"
import { MessageSquareReply, MessageSquareOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Message } from "@/types/message"

export function MessageCard({ msg }: { msg: Message }) {
  const [showReply, setShowReply] = useState(false);

  const handleDeleteMessage = async () => {
    console.log('delete message');
  }

  const handleSendReply = async () => {
    console.log('send reply');
  }

  return (
    <Card className="w-full md:w-[90%] m-4 mx-auto">
      <CardHeader>
        <CardTitle>{msg.name}</CardTitle>
        <div className="flex sm:flex-row justify-between items-start">
          <CardDescription>{msg.email}</CardDescription>
          <CardDescription>{new Date(msg.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {msg.message}
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-center">
        <div className="flex justify-between items-center w-full">
          <div onClick={() => setShowReply(true)} className="flex justify-start items-center cursor-pointer">
            <MessageSquareReply />
          </div>
          <div onClick={handleDeleteMessage} className="flex justify-start items-center cursor-pointer">
            <MessageSquareOff />
          </div>
        </div>
        {showReply &&
          <div className="grid w-full gap-2 mt-4">
            <Textarea placeholder="Type your message here." />
            <div className="flex justify-between items-center">
              <Button className="w-fit px-10" variant={"outline"} onClick={() =>setShowReply(false)}>Cancel</Button>
              <Button className="w-fit px-10" onClick={handleSendReply}>Reply</Button>
            </div>
          </div>
        }
      </CardFooter>
    </Card>
  )
}

