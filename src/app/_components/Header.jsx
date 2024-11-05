"use client";
import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div>
        {/* <Image src={"/logo.svg"} width={40} height={25}/> */}
        <span className="text-blue-800 font-bold text-2xl">ExpenseEase</span>
      </div>
      {isSignedIn ? <UserButton/> : 
      <div className="flex items-center gap-3">
        <Link href={'/dashboard'}><Button variant="outline" className="rounded-full"> Dashboard</Button></Link>
        <Link href={'/get-started'}><Button className="rounded-full"> Get Started</Button></Link>
        </div> 
        }
      
    </div>
  );
};

export default Header;
