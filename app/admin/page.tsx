import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/products");
  return <div className="w-full">Admin Page</div>;
}
