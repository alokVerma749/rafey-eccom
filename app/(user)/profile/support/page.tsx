import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">SUPPORT</h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="full-name">Full Name*</Label>
            <Input id="full-name" placeholder="Enter full name" />
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
            <Label htmlFor="email">Email*</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here" />
          </div>
        </div>

        {/* Right Side - File Upload */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100">
          <UploadCloud className="text-gray-400 h-12 w-12" />
          <p className="text-gray-600 mt-2">
            Drop your file in here or <span className="text-blue-600 cursor-pointer">Browse</span>
          </p>
          <p className="text-xs text-gray-500">(max file size: 15MB, accepted formats: PNG, JPG, PDF)</p>
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-fit bg-indigo-900 text-white mt-6 px-6">Send</Button>
    </div>
  );
};

export default Support;
