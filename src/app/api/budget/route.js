

import dbConnect from '../../../lib/dbconfig'
import Budget from "../../../models/budgets.models";

export async function GET(req) {
  await dbConnect();
  try {
    const userEmail = req.nextUrl.searchParams.get("userEmail");
    const budgets = await Budget.aggregate([
      {
        $match: {
          createdBy: userEmail,
        },
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
          totalSpend: { $sum: "$expenses.amount" }, // Direct sum without $toDouble
          totalItems: { $size: "$expenses" },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    if (budgets.length === 0) {
      return new Response(
        JSON.stringify({ message: "No expenses or budgets found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function POST(req) {
  await dbConnect();

  try {
    const { name, amount, createdBy, icon } = await req.json();

    // Validate required fields
    if (!name || !amount || !createdBy || !icon) {
      return new Response(
        JSON.stringify({ message: "Required credentials are missing" }),
        { status: 400 }
      );
    }

    const newBudget = new Budget({ name, amount, createdBy, icon });
    await newBudget.save();

    if (!newBudget) {
      return new Response(
        JSON.stringify({ success: false, message: "Budget creation failed" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "New Budget Created!", budget: newBudget }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error creating budget", details: error.message }),
      { status: 500 }
    );
  }
}




