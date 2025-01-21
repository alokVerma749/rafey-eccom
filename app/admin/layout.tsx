import { Footer } from "../components/Footer";
import { getSession } from "@/utils/auth";

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  console.log(session)
  return (
    <div>
      {/* admin header */}
      {/* sidebar */}
      {children}
      <Footer />
    </div>
  );
}
