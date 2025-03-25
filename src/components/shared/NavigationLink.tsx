"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  path: string;
  route: string;
};

export default function NavigationLink({ path, route }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "text-[#100E18] hover:text-[#D84C3F] transition-colors",
        isActive && "text-[#F65D4E] font-semibold"
      )}
    >
      {route}
    </Link>
  );
}
