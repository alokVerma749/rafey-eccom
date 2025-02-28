import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Message } from "@/types/message"

export function MessageCard({ msg }: { msg: Message }) {

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
      {/* <CardFooter className="flex flex-col items-start justify-center">
          <div onClick={handleDeleteMessage} className="flex justify-start items-center cursor-pointer">
            <MessageSquareOff />
          </div>
      </CardFooter> */}
    </Card>
  )
}

