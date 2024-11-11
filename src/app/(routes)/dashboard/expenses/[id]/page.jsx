"use client";
import { Button } from "../../../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {  PenBox, Trash , ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";

import EditBudget from "../_components/EditBudget";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";

function Page() {
  const param = useParams();
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter();
  // const route = useRouter();

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);
    const getBudgetInfo = async () =>{
      try {
        const response = await axios.get(`/api/budget/${param.id}` ,{
          params: { userEmail: user?.primaryEmailAddress?.emailAddress },
        })
        if(response){
          setbudgetInfo(response.data)
          getExpenseList()
        }
        else {
          console.log("error fetching budget");
        }
        
      } catch (error) {
        console.log("error fetching budget", error);
      }
    }
  
  const getExpenseList = async () => {
    try {
      const response = await axios.get(`/api/expenses/${param.id}`);
      if (response) {
        console.log(response.data);
        setExpensesList(response.data);
      }
    } catch (error) {
      console.log("Error fetching expenses", error);
      toast("Error fetching expenses info!");
    }
  };

  const deleteBudget = async () => {
    try {
      const response = await axios.delete(`/api/expenses/deleteBudget`, {
        params: {
          budgetId: param.id,
        },
      });
      if (response) {
        toast("budget deleted");
        router.replace("/dashboard/budgets");
        console.log("delete", response.data);
      } else {
        toast.error("Failed to delete budget");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the budget");
      console.log("Error deleting budget:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        
      <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex items-center gap-2">
          <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6  gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full dark:bg-slate-800 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense budgetId={param.id} refreshData={() => getBudgetInfo()} />
      </div>
      <div>
        
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default Page;
