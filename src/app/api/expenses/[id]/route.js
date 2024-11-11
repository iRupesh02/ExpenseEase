"use server";

import Expense from "../../../../models/expense.models";
import Budget from "../../../../models/budgets.models";
import dbConnect from "../../../../lib/dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    let { id } = params;

    const expenses = await Expense.find({ budgetId: id }).sort({ _id: -1 });

    if (!expenses) {
      return new NextResponse(
        JSON.stringify({ message: "expenses not found" }, { status: 401 })
      );
    }

    return new NextResponse(JSON.stringify(expenses, { status: 201 }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

