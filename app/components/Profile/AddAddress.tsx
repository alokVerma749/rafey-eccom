import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPinHouse } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function AddAddress() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-x-2">
            <MapPinHouse />
            <span>Add New Address</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">ADD ADDRESS</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Full Name*</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name*</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email*</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number*</Label>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>
                <Input id="mobile" type="tel" placeholder="98765 54321" />
              </div>
            </div>
          </div>

          <div>
            <Label>Address Type</Label>
            <RadioGroup defaultValue="home" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="office" id="office" />
                <Label htmlFor="office">Office</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="address">Address*</Label>
            <Textarea id="address" placeholder="Enter full address" />
          </div>

          <div>
            <Label htmlFor="additional">Additional Address</Label>
            <Input id="additional" placeholder="Type here..." />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pincode">Pincode*</Label>
              <Input id="pincode" placeholder="400104" />
            </div>
            <div>
              <Label htmlFor="state">State*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Maharashtra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="country">Country*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="India" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" className="w-full bg-indigo-900 text-white">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
