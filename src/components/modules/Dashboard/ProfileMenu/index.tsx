"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutFromCookie } from "@/services/Auth";
import { LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ProfileMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFromCookie();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="user icon" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href="/user/dashboard/profile"
            className="flex gap-2 text-base items-center "
          >
            <User className="w-6 h-6" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <span className="flex gap-2 items-center text-base cursor-pointer">
            <LogOutIcon className="w-6 h-6" />
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
