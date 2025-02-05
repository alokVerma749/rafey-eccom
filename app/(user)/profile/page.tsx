import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["user", "admin"].includes(session.user.role as string)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const user = await getUser(session.user.email);
  // const userData: UserAccount = JSON.parse(user);

  // const orders = await getOrders(userData._id);
  // const ordersData: Order[] = JSON.parse(orders);

  return (
    <div className="w-full">Profile Page</div>
  );
}
