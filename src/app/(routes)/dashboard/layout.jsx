"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, {useEffect } from "react";
import axios from "axios";
import SideNav from "./_components/SideNav";
import DashBoardHeader from "./_components/DashBoardHeader";

function Layout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  const checkUserBudget = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    try {
      const response = await axios.post(
        "/api/dashboard",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data.length === 0) {
        // If no budget exists, redirect to the budgets page
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.log("Error fetching budgets:", error);
    }
  }

  useEffect(() => {
    if (user) {
      checkUserBudget();
    }
  }, [user, checkUserBudget]);

  return (
    <>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashBoardHeader />
        {children}
      </div>
    </>
  );
}

export default Layout;
