
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList} from "@/components/ui/command"

import { Message } from "@/types/message"

export function SearchMessage({ msgs }: { msgs: Message[] }) {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px] h-fit w-full md:w-[90%] m-4 mx-auto">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {msgs.map((msg) => (
            <CommandItem key={msg._id}>
              <p>{msg.name}</p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
