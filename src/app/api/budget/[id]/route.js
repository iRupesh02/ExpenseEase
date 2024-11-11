import Budget from "../../../../models/budgets.models";
import Expense from "../../../../models/expense.models";
import dbConnect from "../../../../lib/dbconfig";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  let { id } = params;  
  const url = new URL(req.url);  
  const userEmail = url.searchParams.get("userEmail");  
  
  await dbConnect();

  try {
    
    const budget = await Budget.aggregate([
      {
        $match: { _id: new ObjectId(id), createdBy: userEmail },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "budgetId",
          as: "expenses",
        },
      },
      {
        $addFields: {
          totalSpend: { $sum: "$expenses.amount" },
          totalItems: { $size: "$expenses" },
        },
      },
    ]);

    if (budget.length === 0) {
      return new NextResponse("Budget not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(budget[0]), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 502 });
  }
}


export async function DELETE(req, { params }) {
  const { id } = params;
  const { userEmail } = req.headers; // Assuming you're passing user email via headers or authentication

  await dbConnect();

  try {
   
    await Expense.deleteMany({ budgetId: id, createdBy: userEmail });

    
    const result = await Budget.deleteOne({ _id: new ObjectId(id), createdBy: userEmail });

    if (result.deletedCount === 0) {
      return new NextResponse("Budget not found or not authorized", { status: 404 });
    }

    return new NextResponse("Budget and expenses deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
