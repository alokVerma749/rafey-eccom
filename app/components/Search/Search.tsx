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
  const [loading, setLoading] = useState(false)

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
    if (!searchQuery) {
      setProducts([])
      return
    }

    setLoading(true)
    fetch(`/api/suggestions?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [searchQuery])

  return (
    <>
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
        <CommandList>
          {loading ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : products.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Products">
                {products.map((product) => (
                  <Link key={product._id} href={`/product/${product._id}`} passHref>
                    <CommandItem asChild>
                      <div className="flex items-center cursor-pointer">
                        <Package className="mr-2" />
                        <span>{product.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {product.category}
                        </span>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </>
          )}

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
    </>
  )
}
