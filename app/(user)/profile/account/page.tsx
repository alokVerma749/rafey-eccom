'use client'

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


function AccountDetail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft className="text-gray-600 cursor-pointer" />
        <h2 className="text-xl font-semibold text-gray-800">ACCOUNT DETAILS</h2>
      </div>

      <div>
        <Label className="text-gray-700">Gender*</Label>
        <RadioGroup defaultValue="mr" className="flex gap-4 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mr" id="mr" />
            <Label htmlFor="mr">Mr</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mrs" id="mrs" />
            <Label htmlFor="mrs">Mrs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="miss" id="miss" />
            <Label htmlFor="miss">Miss</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mx" id="mx" />
            <Label htmlFor="mx">Mx</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prefer-not" id="prefer-not" />
            <Label htmlFor="prefer-not">Id rather not say</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="full-name">Full Name*</Label>
          <Input id="full-name" placeholder="Enter full name" />
        </div>
        <div>
          <Label htmlFor="last-name">Last Name*</Label>
          <Input id="last-name" placeholder="Chauhan" />
        </div>
        <div>
          <Label htmlFor="email">Email*</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
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
            <Input id="mobile" type="tel" placeholder="Enter number" />
          </div>
        </div>
        <div>
          <Label htmlFor="dob">DOB*</Label>
          <Input id="dob" type="date" placeholder="dd/mm/yyyy" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="relative">
          <Label htmlFor="password">Enter Password</Label>
          <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 pt-6"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className="relative">
          <Label htmlFor="confirm-password">Re-enter Password</Label>
          <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter Password" />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 pt-6"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <Button className="w-fit bg-indigo-900 text-white mt-6 px-6">Save details</Button>
    </div>
  );
}

export default AccountDetail;
