'use server';

import dbConnect from '../../../../lib/dbconfig'
import Budget from "../../../../models/budgets.models";
import { NextResponse } from "next/server";
export async function PATCH(req) {
    await dbConnect();
  
    try {
      const { id, name, amount, icon } = await req.json();
  
      const updatedBudget = await Budget.findByIdAndUpdate(
        {_id:id},
        { name, amount, icon },
        { new: true }
      );
  
      if (!updatedBudget) {
        return NextResponse.json(
          { success: false, message: "Budget not found or failed to update." },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "Budget updated successfully", updatedBudget },
        { status: 200 }
      );
    } catch (error) {
      console.log("Failed to update budget:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update budget." },
        { status: 500 }
      );
    }
  }
  