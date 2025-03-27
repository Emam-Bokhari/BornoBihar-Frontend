"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TUser } from "@/types";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function Profile({ profileData }: { profileData: TUser }) {
  const [profile, setProfile] = useState(profileData);
  const handleSave = async (updatedProfile: any) => {
    setProfile(updatedProfile);
  };
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <div className="w-[70px] h-[70px] relative overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dvpqm6zct/image/upload/v1742736505/user_ug5gxm.png"
              alt="Profile Image"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-[#100E18]">
              {profileData?.name}
            </CardTitle>
            <p className="text-sm text-green-500 capitalize">
              {profileData?.role}
            </p>
            <p className="text-sm text-[#8a8a8a]">
              {profileData?.city && profileData?.country
                ? `${profileData.city} , ${profileData.country}`
                : profileData?.city || profileData?.country}
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#100E18]">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#8a8a8a]">Email Address</p>
            <p className="text-base">{profileData?.email}</p>
          </div>
          <div>
            <p className="text-sm text-[#8a8a8a]">Phone</p>
            <p className="text-base">{profileData?.phone || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-[#8a8a8a]">Age</p>
            <p className="text-base">{profileData?.age || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-[#8a8a8a]">Gender</p>
            <p className="text-base capitalize">
              {profileData?.gender || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#100E18]">Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#8a8a8a]">Country</p>
            <p className="text-base">
              {profileData?.country || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#8a8a8a]">City</p>
            <p className="text-base">{profileData?.city || "Not Provided"}</p>
          </div>
          <div>
            <p className="text-sm text-[#8a8a8a]">Postal Code</p>
            <p className="text-base">
              {profileData?.postalCode || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* actions */}
      <Separator className="mt-4" />
      <div className="flex justify-end w-full p-6">
        <div className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer rounded-lg">
          <ProfileModal profile={profile} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
