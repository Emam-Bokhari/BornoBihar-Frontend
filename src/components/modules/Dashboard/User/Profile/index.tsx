"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TUser } from "@/types";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import { User, MapPin, Shield } from "lucide-react";

export default function Profile({ profileData }: { profileData: TUser }) {
  const [profile, setProfile] = useState(profileData);
  const handleSave = async (updatedProfile: TUser) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="p-4 space-y-6 pb-12 max-w-5xl">
      {/* Profile Header Card */}
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 relative overflow-hidden rounded-full border-2 border-[#F65D4E]/20 bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <Image
                src={
                  profileData?.image ||
                  "https://res.cloudinary.com/dvpqm6zct/image/upload/v1742736505/user_ug5gxm.png"
                }
                alt="Profile Image"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                {profileData?.name || "User Profile"}
              </CardTitle>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 capitalize">
                  <Shield className="w-3 h-3" />
                  {profileData?.role || "user"}
                </span>
                {(profileData?.city || profileData?.country) && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 opacity-60" />
                    {profileData?.city && profileData?.country
                      ? `${profileData.city}, ${profileData.country}`
                      : profileData?.city || profileData?.country}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="p-5 pb-3 border-b border-gray-100 dark:border-zinc-800/80">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-[#F65D4E]" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Your personal contact and identification details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Email Address</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.email || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone Number</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Age</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.age || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="text-sm font-medium text-foreground mt-0.5 capitalize">
              {profileData?.gender || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="p-5 pb-3 border-b border-gray-100 dark:border-zinc-800/80">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F65D4E]" />
            Address Details
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Shipping and location information for orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Country</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.country || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">City</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.city || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Postal Code</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {profileData?.postalCode || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end pt-2">
        <div className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white rounded-xl shadow-xs transition-colors">
          <ProfileModal profile={profile} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
