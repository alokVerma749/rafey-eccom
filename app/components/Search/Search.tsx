"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Amphora, Flame, Package, Palette, Search } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"
import { Product } from "@/types/product_type"

export function CommandDialogSearch() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery) {
        setProducts([])
        return
      }

      try {
        const res = await fetch(`/api/suggestions?q=${searchQuery}`)
        if (!res.ok) throw new Error("Failed to fetch suggestions")

        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  return (
    <div className="font-bellefair font-medium">
      <p className="text-sm cursor-pointer">
        <Search onClick={() => setOpen(true)} />
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <CommandInput
          placeholder="Search for a product or category..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        {products.length === 0 ? <CommandEmpty>No results found.</CommandEmpty> :
          <>
            {products.length === 0 ? <CommandEmpty>No results found.</CommandEmpty> : (
              <div className=" max-h-36 overflow-y-scroll">
                {products.map((product) => (
                  <div key={product._id} className="p-2 hover:bg-gray-100">
                    <Link href={`/product/${product._id}`} className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                      <div className="flex items-center justify-between w-full cursor-pointer tracking-widest">
                        <Package className="mr-2" />
                        <span>{product.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {product.category}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        }
        <CommandList>
          <CommandSeparator />
          <CommandGroup heading="Categories">
            <CommandItem>
              <Flame />
              <Link href="/shop/candles">
                <span>Candles</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Palette />
              <Link href="/shop/resin_art">
                <span>Resin Arts</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Amphora />
              <Link href="/shop/ceramic_art">
                <span>Ceramic Arts</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
