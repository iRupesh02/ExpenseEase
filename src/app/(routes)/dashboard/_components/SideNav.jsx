import {
  LayoutGrid,
  BadgeIndianRupee,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
    const {user} = useUser()
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    
  ];
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Link href={'/'}>
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} width={40} height={25} alt="logo" />
        <span
          className="text-blue-800 dark:text-blue-800
             hover:text-blue-500 font-bold text-xl"
        >
          ExpenseEase
        </span>
      </div>
      </Link>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-zinc-400 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-zinc-800
                        ${path == menu.path && "text-primary bg-zinc-800"}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="fixed bottom-10 p-5 flex gap-2
            items-center"
      >
        <UserButton />
        {user?.fullName}
      </div>
    </div>
  );
}

export default SideNav;
