import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-4">
            <Link href="/" >
              <Image
                alt="wonders tapestry"
                src="/asset/logo-white.png"
                height={200}
                width={250}
              />
            </Link>
            {/* <h2 className="text-2xl font-bold text-white mb-4 mx-auto text-center">Wonders Tapestry</h2> */}
            <p className="mb-4">
              Handcrafted ceramics, candles, and resin art pieces made with love and attention to detail.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/sales" className="hover:text-white">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-white">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
            <p className="mb-4">Follow us on social media for the latest updates, sale alerts, and more.</p>
            <div className="flex space-x-4 mb-4">
              <Link href="https://www.instagram.com/wonderstapestry?igsh=MWxha3I2d2F4N2kyaQ%3D%3D&utm_source=qr" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.facebook.com/share/16FxcivVML/?mibextid=wwXIfr" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-xs text-gray-400">Stay connected with us for exclusive offers and updates.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center space-x-6 mb-6">
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
              </svg>
              Credit Card
            </span>
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M7 15H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M11 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              PayPal
            </span>
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Apple Pay
            </span>
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
              </svg>
              Google Pay
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-white">
              Shipping Policy
            </Link>
            <Link href="/returns" className="hover:text-white">
              Return Policy
            </Link>
          </div>

          <div className="text-center mt-6 text-sm">© 2025 Wonders Tapestry. All rights reserved. Handcrafted with love.</div>
        </div>
      </div>
    </footer>
  )
}
