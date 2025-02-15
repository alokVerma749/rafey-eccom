import Image from "next/image"
import { Mail } from "lucide-react"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { getUser } from "@/db_services/user"
import type { UserAccount } from "@/models/user_model"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!["user", "admin"].includes(session.user.role as string)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await getUser(session.user.email)
  const userData: UserAccount = JSON.parse(user)

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              height={80}
              width={80}
              src={userData.image || "/placeholder.svg"}
              alt="profile image"
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <Button variant="default">
            <Link href='/profile/order-history'>My Orders</Link>
          </Button>
        </div>

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input disabled id="fullName" placeholder="Your First Name" defaultValue={userData.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input disabled defaultValue={userData.email} id="email" placeholder="Your Email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input disabled defaultValue={userData.address} id="email" placeholder="Your Address" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input disabled defaultValue={userData.country} id="country" placeholder="Your Country" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input disabled defaultValue={userData.phone} id="phone" placeholder="Your Phone" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input disabled defaultValue={userData.pincode} id="pincode" placeholder="Your Pincode" />
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">My email Address</h3>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{userData.email}</p>
              <p className="text-sm text-muted-foreground">1 month ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

