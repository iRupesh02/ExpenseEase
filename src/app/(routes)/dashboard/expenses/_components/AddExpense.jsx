"use client";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/expenses", {
        name,
        amount,
        budgetId,
      });

      const result = response.data;

      // Check if the response indicates success
      if (result.success) {
        refreshData();
        toast(result.message || "New Expense Added!");
        setAmount("");
        setName("");
      } else {
        toast.error(result.message || "Failed to add expense.");
      }
    } catch (error) {
      console.log("Failed to add expense:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-2xl dark:bg-zinc-900">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="dark:text-zinc-300 font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="dark:text-zinc-300 font-medium my-1">Expense Amount</h2>
        <Input
         type="number"
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
        />
      </div>
      <Button
        disabled={!(name && amount) ||  loading}
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full dark:text-zinc-400"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
