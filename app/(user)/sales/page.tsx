import Image from "next/image";
import type { Product } from "@/types/product_type";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/app/components/Sales/countDown-Timer";
import { ProductGrid } from "@/app/components/Sales/product-grid";
import getSalesProductsAction from "@/actions/sales/get_sales_products";
import Link from "next/link";
import { FeaturedProducts } from "@/app/components/Sales/FeaturedProducts";
import getVouchersAction from "@/actions/voucher/get-vouchers";
import { IDiscountToken } from "@/types/vouchers_type";
import { AddToCartSales } from "@/app/components/Sales/CartButton";
import PromoBanner from "@/app/components/Sales/PromoBanner";

export default async function SalesPage() {
  const response = await getSalesProductsAction();
  const products: Product[] = response ? JSON.parse(response as string) : [];

  const vouchersResponse = await getVouchersAction(true);
  const vouchers = vouchersResponse ? JSON.parse(vouchersResponse as string) : [];
  const bannerVoucher = vouchers.find((voucher: IDiscountToken) => voucher.showOnBanner);

  if (!products) {
    return {
      title: "Product Not Found",
      description: "The requested product was not found.",
    };
  }

  const candleProducts = products.filter((product) => product.category === "candles");
  const ceramicProducts = products.filter((product) => product.category === "ceramic art");
  const resinProducts = products.filter((product) => product.category === "resin art");

  // Find the candle with the most stock left
  const featuredCandle = candleProducts.reduce((prev, current) => (prev.stock > current.stock ? prev : current), candleProducts[0]);
  const discountPercentageFeaturedCandle = featuredCandle && featuredCandle?.discount?.percentage || 0;

  return (
    <div className="font-marcellus">

      {/* Main Sale Banner */}
      <section className="bg-[#e25c3c] text-white py-16 relative">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center">
            <div className="absolute left-10 top-10 bg-[#f8d568] rounded-full p-4 rotate-[-15deg] hidden md:block animate-pendulum-right">
              <div className="text-[#e25c3c] font-bold h-20 w-20 flex flex-col justify-center items-center">
                <span className="block text-lg">SALE UPTO</span>
                <span className="block text-lg">70% OFF</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4">SALE ONGOING</h1>
            <div className="absolute right-10 top-10 bg-[#f8d568] rounded-full p-4 rotate-[15deg] hidden md:block animate-pendulum-right">
              <div className="text-[#e25c3c] font-bold h-16 w-16 flex flex-col justify-center items-center">
                <span className="block text-xl">HOT</span>
                <span className="block text-lg">DEAL 🔥</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl mb-8">
            Up to <span className="text-[#f8d568] font-bold">70% OFF</span> on selected handcrafted items
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button className="bg-white text-[#e25c3c] hover:bg-[#f8d568] px-8 py-3 text-lg font-bold rounded-md">
              <Link href='/'>
                Shop Now
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-[#e25c3c] px-8 py-3 text-lg font-bold rounded-md"
            >
              <Link href='/shop'>
                View All
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl mb-4">Limited Time Offer Ends In:</h3>
            <CountdownTimer />
          </div>
        </div>
      </section>

      <FeaturedProducts products={products} />

      {/* Candle Collection */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#e25c3c] mb-2">Candle Collection Sale</h2>
          <div className="w-24 h-1 bg-[#2a8a9d] mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12">
            Indulge in our premium handcrafted candles with luxurious scents. Perfect for creating a cozy atmosphere or
            as a thoughtful gift.
          </p>

          <ProductGrid products={candleProducts} />

          <div className="text-center mt-12">
            <Link href='/shop/candles'>
              <Button className="bg-[#e25c3c] text-white hover:bg-[#d04c2e] px-6 py-3">
                View All Candles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Candle Promo Banner */}
      <section className="bg-[#2a8a9d] text-white py-8 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-2">Discover Our Exclusive Candle Collection!</h2>
            <p className="mb-4">
              Explore our wide range of handcrafted scented candles. Perfect for creating a cozy atmosphere or as a thoughtful gift.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-[#2a8a9d] hover:bg-[#f8f9fa] font-medium">
                <Link href={'/shop/candles'}>
                  Shop Scented Candles
                </Link>
              </Button>
              <Button variant="outline" className="bg-transparent hover:bg-white hover:text-[#2a8a9d]">
                <Link href={'/shop'}>
                  View All Products
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-6 md:mt-0 animate-pendulum-right">
            <div className="bg-white rounded-full p-6 text-center border border-red-900 h-32 w-32">
              <div className="text-[#e25c3c] font-bold">
                <span className="block text-xl">Limited</span>
                <span className="block text-xl">Time</span>
                <span className="block text-xl">Offer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Candle Product */}
      {featuredCandle && <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 flex items-center justify-center">
                <Image
                  src={featuredCandle?.images?.[0] || "/placeholder.svg"}
                  alt={featuredCandle?.name}
                  width={400}
                  height={400}
                  className="rounded-md"
                />
              </div>
              <div className="p-8 relative">
                <div className="absolute top-4 right-4 bg-[#e25c3c] text-white font-bold rounded-full p-4">
                  <span className="block text-center">{discountPercentageFeaturedCandle}% OFF</span>
                </div>
                <span className="text-[#2a8a9d] font-semibold">FEATURED DEAL</span>
                <h3 className="text-3xl font-bold mt-2 mb-4">{featuredCandle?.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-[#e25c3c]">₹{Math.round(featuredCandle.price - (featuredCandle.price * discountPercentageFeaturedCandle) / 100)}</span>
                  <span className="text-gray-500 line-through">₹{featuredCandle?.price}</span>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">(94 reviews)</span>
                </div>
                <p className="text-gray-700 mb-6">
                  {featuredCandle.description}
                </p>
                {
                  (featuredCandle.tags || featuredCandle.subCategories) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredCandle.tags && featuredCandle.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm mr-2">{tag.name}</span>
                      ))}
                      {featuredCandle.subCategories && featuredCandle.subCategories.map((subCategory, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm mr-2">{subCategory.name}</span>
                      ))}
                    </div>
                  )
                }
                <div className="flex gap-4">
                  <AddToCartSales product={featuredCandle} classNameGen="bg-[#e25c3c] w-fit text-white hover:bg-[#d04c2e] px-6 py-3" />
                  <Button
                    variant="outline"
                    className="border-[#2a8a9d] text-[#2a8a9d] hover:bg-[#2a8a9d] hover:text-white px-6 py-3"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* Ceramic Collection */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2a8a9d] mb-2">Ceramic Collection Sale</h2>
          <div className="w-24 h-1 bg-[#e25c3c] mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12">
            Discover our handcrafted ceramic pieces at special prices. Each item is uniquely designed and crafted with
            care.
          </p>
          <ProductGrid products={ceramicProducts} />

          <div className="text-center mt-12">
            <Link href='/shop/ceramic_art'>
              <Button className="bg-[#e25c3c] text-white hover:bg-[#d04c2e] px-6 py-3">
                View All Ceramic Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ceramic Promo Banner */}
      {bannerVoucher && <PromoBanner bannerVoucher={bannerVoucher} />}

      {/* Resin Art Collection */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2a8a9d] mb-2">Resin Art Collection Sale</h2>
          <div className="w-24 h-1 bg-[#e25c3c] mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12">
            Discover our stunning collection of handcrafted resin art pieces at special prices. Each piece is uniquely created with vibrant colors and mesmerizing patterns.
          </p>
          <ProductGrid products={resinProducts} />
          <div className="text-center mt-12">
            <Link href='/shop/resin_art'>
              <Button className="bg-[#e25c3c] text-white hover:bg-[#d04c2e] px-6 py-3">
                View All Resin Product
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
