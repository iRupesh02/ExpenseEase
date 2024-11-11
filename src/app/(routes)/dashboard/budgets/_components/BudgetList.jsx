"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user , getBudgetList]);

  const getBudgetList = useCallback(async () => {
    try {
      const response = await axios.get("/api/budget", {
        params: { userEmail: user?.primaryEmailAddress?.emailAddress },
      });
      if (!response) {
        console.log("error fetching budget");
      }
      // console.log(response.data);
      
      setBudgetList(response.data);
    } catch (error) {
      console.log("error fetching budget", error);
    }
  },[user])

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full dark:bg-zinc-800 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}
export default BudgetList;
