import Image from "next/image";
import getSalesProductsAction from "@/actions/sales/get_sales_products";
import { Product } from "@/types/product_type";
import { NewArrivals } from "@/app/components/Sales/NewArrivals";
import { Header } from "@/app/components/Header";
import SaleImage from "@/public/asset/SalesImage.png";
import SalesRightImage from "@/public/asset/SalesRightImage.png";
import { Footer } from "@/app/components/Footer";

export default async function SalesPage() {
  const response = await getSalesProductsAction();
  const products: Product[] = response ? JSON.parse(response as string) : [];

  if (!products) {
    return {
      title: "Product Not Found",
      description: "The requested product was not found.",
    };
  }

  return (
    <div>
      <Header />
      <div className=" mb-10">
        <section className="px-2 sm:px-10 bg-black text-white text-center py-20 relative">
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div>
              <h2 className="text-5xl font-bold my-4">Black Friday </h2>
              <Image src={SaleImage.src} alt="SaleImage" height={200} width={200} className="mx-auto" />
            </div>
            <Image src={SalesRightImage} alt="Image" height={800} width={800} className="max-h-72 max-w-96 rounded-md" />
          </div>
          <p className="my-4">Take your time & think about what you buy, because its Black Friday.</p>
          <div className="mt-6 border w-fit flex justify-center items-center space-x-10 mx-auto p-4 rounded-2xl absolute -bottom-10 md:left-1/4 transform -translate-x-1/2 bg-black bg-opacity-50">
            <div>
              <span className="text-3xl font-bold">30% OFF</span>
              <span className="block text-sm">On New Arrivals</span>
            </div>
            <button className="mt-6 px-2 py-2 bg-transparent border text-white rounded-lg font-bold">Explore More</button>
          </div>
        </section>
        <NewArrivals products={products} />
      </div>
      <Footer />
    </div>
  );
}
