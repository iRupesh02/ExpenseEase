'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

function ExpenseListTable({ refreshData , expensesList }) {
  

  // Deleting an expense
  const deleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete('/api/expenses', {
       data:{ id: expenseId }, 
      });

      if (response.data.success) {
        toast('Expense Deleted!');
        refreshData();
        
      }
    } catch (error) {
      console.log("Error deleting expense", error);
    }
  };

  

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl dark:bg-zinc-900 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      <div className='rounded-md'>
      {expensesList.map((expense,index) => (
        <div key={index} className="grid grid-cols-4 dark:bg-zinc-800  p-2 ">
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
          
          <h2>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expense._id)}
            />
          </h2>
        </div>
      ))}
      </div>
    </div>
  );
}

export default ExpenseListTable;
