import dbConnect from '../../../lib/dbconfig'
import Expense from '../../../models/expense.models'
import { NextResponse } from 'next/server';
import moment from "moment";
import Budget from '../../../models/budgets.models';
export async function DELETE(req ) {
    await dbConnect();
    try {
      
      const { id } = await req.json();
      const deletedExpense = await Expense.findByIdAndDelete({
        _id:id
      });
  
      if (!deletedExpense) {
        return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
      }
  
      return  NextResponse.json({ success: true, message: 'Expense deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error("Error deleting expense", error);
      return  NextResponse.json({ success: false, message: 'Failed to delete expense' }, { status: 500 });
    }
  }
  
  export async function POST(request) {
    await dbConnect();
  
    const { name, amount, budgetId  } = await request.json();
    
   
    if (typeof name !== "string" || isNaN(amount) || typeof amount !== "number") {
      return new Response(
        JSON.stringify({ message: "Invalid input data: 'name' should be a string and 'amount' should be a number." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  
  
    try {
   
      const newExpense = await Expense.create({
        name,
        amount,
        budgetId,
        createdAt: moment().format("YYYY-MM-DD"),
      });
       if(!newExpense){
        return   NextResponse.json(
          { success: false, message: "Failed to add expense" },
          { status: 401 }
        );
       }
      return   NextResponse.json(
        { success: true, message: "New Expense Added!", expense: newExpense },
        { status: 201 }
      );
    } catch (error) {
      console.log("Error adding new expense:", error);
      return   NextResponse.json(
        { success: false, message: "Failed to add expense", error: error.message },
        { status: 500 }
      );
    }
  }

  export async function GET(req){
    await dbConnect()
    try {
      const userEmail = req.nextUrl.searchParams.get('email');
      const expenses = await Budget.aggregate([
        {
          $match:{
            createdBy:userEmail
          }
        },
        {
          $lookup:{
            from:'expenses',
            localField:'_id',
            foreignField:'budgetId',
            as:'expenses'
          }
        },
        { $unwind: '$expenses' },
        {
          $project: {
            _id: '$expenses._id', // Only expense fields
            name: '$expenses.name',
            amount: '$expenses.amount',
            createdAt: '$expenses.createdAt',
          },
        },
        { $sort: { _id: -1 } }
      ])
      if(!expenses){
        return new NextResponse("Budget not found", { status: 404 })
      }
      return new NextResponse(JSON.stringify(expenses), { status: 200 })
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 502 })
    }
  }
  
  
  
  