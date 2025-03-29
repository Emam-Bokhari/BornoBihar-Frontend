"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { TUser } from "@/types";
import { toast } from "sonner";
import { updateProfile } from "@/services/User";

export default function ProfileModal({
  profile,
  onSave,
}: {
  profile: TUser;
  onSave: (updateProfile: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    image: profile?.image || "",
    phone: profile?.phone || "",
    age: profile?.age || "",
    gender: profile?.gender || "",
    country: profile?.country || "",
    city: profile?.city || "",
    postalCode: profile?.postalCode || "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: "male" | "female") => {
    setFormData({ ...formData, gender: value || "male" });
  };

  const handleSubmit = async () => {
    // url validation function
    const isValidURL = (url: string) => {
      if (!url) return true;
      const regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i;
      return regex.test(url);
    };
    // Validate all URLs: profilePicture
    if (!isValidURL(formData.image)) {
      toast.error("Please enter valid URLs for Profile Picture!");
      return;
    }
    try {
      const data = await updateProfile(formData);
      if (data?.success) {
        toast.success("Your Profile updated successfully");
      } else {
        toast.error(data?.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F65D4E] hover:bg-[#D84C3F ] text-white cursor-pointer">
          <Edit3 size={18} /> Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg md:text-xl">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Responsive 2-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Picture URL</Label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                onValueChange={handleGenderChange}
                value={formData.gender}
                defaultValue="male"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Age</Label>
              <Input name="age" value={formData.age} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
