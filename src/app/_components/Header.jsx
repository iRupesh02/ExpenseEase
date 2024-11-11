"use client";
import React, { useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border-b-2 shadow-sm bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center">
        <Link href={'/'} className="cursor-pointer flex items-center">
        <Image src={"/chart-donut.svg"} width={40} height={25} alt="Logo" />
        <span className="text-blue-800 dark:text-blue-800 font-bold text-2xl ml-2">ExpenseEase</span>
        </Link>
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
       
        <Link href={'/dashboard'}>
            <Button variant="outline" className="rounded-full text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </Button>
          </Link>
          <UserButton /> 
        </div>
      ) : (
        <div className="flex items-center gap-3">
          
          <Link href ={'/sign-in'}>
            <Button className="rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
