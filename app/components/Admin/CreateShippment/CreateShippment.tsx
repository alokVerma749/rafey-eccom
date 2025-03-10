"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import type { Order } from "@/types/order"
import type { UserAccount } from "@/models/user_model"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, Edit2Icon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

const createWarehouse = async (warehouseDetails: any) => {
  try {
    const response = await fetch("/api/shipment/create-warehouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouseDetails),
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    const data = await response.json()
    console.log("Warehouse Created:", data)
    return data
  } catch (error) {
    console.error("Error creating warehouse:", error)
  }
}

const CreateShipment = ({ order, user, totalWeight }: { order: Order; user: UserAccount; totalWeight: number }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("shipment")
  const [useCustomWarehouse, setUseCustomWarehouse] = useState(false)

  // Default warehouse details
  const defaultWarehouse = {
    name: "allahabad_facility",
    email: "alokverma749@gmail.com",
    phone: "8948119171",
    address: "M G Marg Sub-Office allahabad",
    city: "Allahabad",
    country: "India",
    pin: "273003",
    return_address: "M G Marg Sub-Office allahabad",
    return_pin: "273003",
    return_city: "Allahabad",
    return_state: "UP",
    return_country: "India",
  }

  const [warehouseData, setWarehouseData] = useState(defaultWarehouse)

  const [formData, setFormData] = useState({
    name: user.name,
    address: user.address,
    pincode: user.pincode,
    city: user.city,
    state: user.state,
    country: user.country,
    phone: user.phone,
    order: order._id,
    payment_mode: "Prepaid",
    products_desc: order.products.map((p) => p.name).join(", "),
    cod_amount: "0",
    order_date: order.createdAt,
    total_amount: order.payableAmount.toString(),
    quantity: order.products.length.toString(),
    waybill: order.waybill || "",
    shipment_width: "10",
    shipment_height: "5",
    weight: totalWeight.toString(),
    shipping_mode: "Surface",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWarehouseData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const resetWarehouseToDefault = () => {
    setWarehouseData(defaultWarehouse)
  }

  async function handleSubmitShipment(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create warehouse first
      const warehouseToUse = useCustomWarehouse ? warehouseData : defaultWarehouse
      await createWarehouse(warehouseToUse)

      // Then create shipment
      const packageDetails = {
        shipments: [formData],
        pickup_location: {
          name: warehouseToUse.name,
          add: warehouseToUse.address,
          city: warehouseToUse.city,
          pin: warehouseToUse.pin,
          country: warehouseToUse.country,
          phone: `91${warehouseToUse.phone}`,
        },
      }

      const res = await fetch("/api/shipment/create-shipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageDetails }),
      })

      const data = await res.json()
      if (data.data?.success) {
        toast({ title: "Shipment created successfully" })
        setIsDialogOpen(false)
      } else {
        toast({
          variant: "destructive",
          title: "Error creating shipment",
          description: data.error || "Unknown error",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creating shipment",
        description: "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-2">
      <Button onClick={() => setIsDialogOpen(true)}>Create Shipment</Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create Shipment</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipment">Shipment Details</TabsTrigger>
              <TabsTrigger value="warehouse">Warehouse Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="shipment">
              <form onSubmit={handleSubmitShipment}>
                <div className="space-y-6">
                  {/* Customer Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Details</CardTitle>
                      <CardDescription>Delivery address and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Customer Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipment Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipment Details</CardTitle>
                      <CardDescription>Package information and shipping preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">
                          Package Weight (gm)
                          <span className="text-xs text-muted-foreground ml-1">(Total weight of all products)</span>
                        </Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          value={formData.weight}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">
                          Total Items
                          <span className="text-xs text-muted-foreground ml-1">(Number of products in shipment)</span>
                        </Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipment_width">Package Width (cm)</Label>
                        <Input
                          id="shipment_width"
                          name="shipment_width"
                          type="number"
                          value={formData.shipment_width}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipment_height">Package Height (cm)</Label>
                        <Input
                          id="shipment_height"
                          name="shipment_height"
                          type="number"
                          value={formData.shipment_height}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment_mode">Payment Mode</Label>
                        <Select
                          value={formData.payment_mode}
                          onValueChange={(value) => handleSelectChange("payment_mode", value)}
                        >
                          <SelectTrigger id="payment_mode">
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Prepaid">Prepaid</SelectItem>
                            <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping_mode">Shipping Mode</Label>
                        <Select
                          value={formData.shipping_mode}
                          onValueChange={(value) => handleSelectChange("shipping_mode", value)}
                        >
                          <SelectTrigger id="shipping_mode">
                            <SelectValue placeholder="Select shipping mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Surface">Surface</SelectItem>
                            <SelectItem value="Express">Express</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.payment_mode === "COD" && (
                        <div className="space-y-2">
                          <Label htmlFor="cod_amount">COD Amount (₹)</Label>
                          <Input
                            id="cod_amount"
                            name="cod_amount"
                            type="number"
                            value={formData.cod_amount}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}
                      <div>
                        <Label htmlFor="waybill">Waybill Number</Label>
                        <Input id="waybill" name="waybill" value={formData.waybill} onChange={handleChange} disabled />
                      </div>
                      <div className="space-y-2 text-green-700 mt-8">
                        Total Amount: ₹{order.payableAmount}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pickup Location Summary */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle>Pickup Location</CardTitle>
                          <div className="relative group">
                            <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-popover text-popover-foreground p-2 rounded shadow-md text-sm w-64 z-50">
                              The warehouse location from where the products will be picked up for shipping
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab("warehouse")} type="button">
                          <Edit2Icon className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                      <CardDescription>
                        {useCustomWarehouse ? "Using custom warehouse" : "Using default warehouse: allahabad_facility"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2">
                        <p>
                          <span className="font-medium">Warehouse Name:</span>{" "}
                          {useCustomWarehouse ? warehouseData.name : defaultWarehouse.name}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {useCustomWarehouse ? warehouseData.address : defaultWarehouse.address}
                        </p>
                        <p>
                          <span className="font-medium">City:</span>{" "}
                          {useCustomWarehouse ? warehouseData.city : defaultWarehouse.city}
                        </p>
                        <p>
                          <span className="font-medium">Pincode:</span>{" "}
                          {useCustomWarehouse ? warehouseData.pin : defaultWarehouse.pin}
                        </p>
                        <p>
                          <span className="font-medium">Contact:</span>{" "}
                          {useCustomWarehouse ? warehouseData.phone : defaultWarehouse.phone}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating Shipment..." : "Create Shipment"}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="warehouse">
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Configuration</CardTitle>
                  <CardDescription>Configure the warehouse details for pickup location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-6">
                    <Switch
                      id="custom-warehouse"
                      checked={useCustomWarehouse}
                      onCheckedChange={setUseCustomWarehouse}
                    />
                    <Label htmlFor="custom-warehouse">Use custom warehouse details</Label>
                  </div>

                  {useCustomWarehouse ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-name">Warehouse Name</Label>
                          <Input
                            id="warehouse-name"
                            name="name"
                            value={warehouseData.name}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-email">Email</Label>
                          <Input
                            id="warehouse-email"
                            name="email"
                            type="email"
                            value={warehouseData.email}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-phone">Phone</Label>
                          <Input
                            id="warehouse-phone"
                            name="phone"
                            value={warehouseData.phone}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="warehouse-address">Address</Label>
                          <Input
                            id="warehouse-address"
                            name="address"
                            value={warehouseData.address}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-city">City</Label>
                          <Input
                            id="warehouse-city"
                            name="city"
                            value={warehouseData.city}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-pin">PIN Code</Label>
                          <Input
                            id="warehouse-pin"
                            name="pin"
                            value={warehouseData.pin}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-country">Country</Label>
                          <Input
                            id="warehouse-country"
                            name="country"
                            value={warehouseData.country}
                            onChange={handleWarehouseChange}
                            required
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Return Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="return-address">Return Address</Label>
                            <Input
                              id="return-address"
                              name="return_address"
                              value={warehouseData.return_address}
                              onChange={handleWarehouseChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="return-city">Return City</Label>
                            <Input
                              id="return-city"
                              name="return_city"
                              value={warehouseData.return_city}
                              onChange={handleWarehouseChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="return-pin">Return PIN Code</Label>
                            <Input
                              id="return-pin"
                              name="return_pin"
                              value={warehouseData.return_pin}
                              onChange={handleWarehouseChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="return-state">Return State</Label>
                            <Input
                              id="return-state"
                              name="return_state"
                              value={warehouseData.return_state}
                              onChange={handleWarehouseChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="return-country">Return Country</Label>
                            <Input
                              id="return-country"
                              name="return_country"
                              value={warehouseData.return_country}
                              onChange={handleWarehouseChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" type="button" onClick={resetWarehouseToDefault}>
                          Reset to Default
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Default Warehouse Details</h3>
                      <div className="text-sm space-y-2">
                        <p>
                          <span className="font-medium">Name:</span> {defaultWarehouse.name}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {defaultWarehouse.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {defaultWarehouse.phone}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> {defaultWarehouse.address}
                        </p>
                        <p>
                          <span className="font-medium">City:</span> {defaultWarehouse.city}
                        </p>
                        <p>
                          <span className="font-medium">PIN:</span> {defaultWarehouse.pin}
                        </p>
                        <p>
                          <span className="font-medium">Country:</span> {defaultWarehouse.country}
                        </p>
                        <p>
                          <span className="font-medium">Return Address:</span> {defaultWarehouse.return_address}
                        </p>
                        <p>
                          <span className="font-medium">Return City:</span> {defaultWarehouse.return_city}
                        </p>
                        <p>
                          <span className="font-medium">Return State:</span> {defaultWarehouse.return_state}
                        </p>
                        <p>
                          <span className="font-medium">Return PIN:</span> {defaultWarehouse.return_pin}
                        </p>
                        <p>
                          <span className="font-medium">Return Country:</span> {defaultWarehouse.return_country}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <div className="p-4 flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("shipment")}>
                    Continue to Shipment
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateShipment;
