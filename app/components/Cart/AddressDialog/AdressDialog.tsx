'use client';

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { UserAccount } from '@/models/user_model';
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';
import { MapPinCheck } from 'lucide-react'
interface AddressModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  user: UserAccount | null;
  setUser: (user: UserAccount) => void;
  handleSaveAddress: () => void;
}

export const AdressDialog: React.FC<AddressModalProps> = ({ isOpen, onClose, user, setUser, handleSaveAddress }) => {
  const [isVailedPinCode, setIsVailedPinCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckPincode = async () => {
    console.log("CAlledd")
    if (!user?.pincode) {
      return toast({ title: "Please enter a pincode" });
    }

    try {
      const response = await fetch(`/api/shipment/check-service?pincode=${user?.pincode}`);
      const data: DeliveryOptionsResponse = await response.json();

      if ((data?.delivery_codes?.length ?? 0) > 0) {
        setIsVailedPinCode(true);
      }
      console.log(data, "&&&&&&&&&&")
    } catch (error) {
      console.error("Error fetching delivery options:", error);
      toast({ title: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
          <DialogDescription>
            Please update your address and pincode to proceed with checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mobile" className="text-right">
              Mobile
            </Label>
            <Input
              id="mobile"
              value={user?.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value } as UserAccount)}
              placeholder="Enter your mobile number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={user?.country}
              onChange={(e) => setUser({ ...user, country: e.target.value } as UserAccount)}
              placeholder="Enter your country"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              value={user?.state}
              onChange={(e) => setUser({ ...user, state: e.target.value } as UserAccount)}
              placeholder="Enter your state"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              value={user?.city}
              onChange={(e) => setUser({ ...user, city: e.target.value } as UserAccount)}
              placeholder="Enter your city"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={user?.address}
              onChange={(e) => setUser({ ...user, address: e.target.value } as UserAccount)}
              placeholder="Enter your address"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pincode" className="text-right">Pincode</Label>
            <Input
              id="pincode"
              value={user?.pincode}
              onChange={(e) => setUser({ ...user, pincode: e.target.value } as UserAccount)}
              placeholder="Enter your pincode"
              className="col-span-2"
            />
            <div onClick={handleCheckPincode} className="cursor-pointer hover:opacity-60">
                <MapPinCheck color={isVailedPinCode ? 'green' : 'red'} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveAddress}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
