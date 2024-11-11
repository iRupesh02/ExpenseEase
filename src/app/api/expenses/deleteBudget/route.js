import dbConnect from '../../../../lib/dbconfig';
import Budget from '../../../../models/budgets.models';
import Expense from '../../../../models/expense.models';
import { NextResponse } from 'next/server';


export async function DELETE(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const budgetId = url.searchParams.get("budgetId");

    

    // Delete all expenses linked to the budget
    await Expense.deleteMany({ budgetId });

    // Delete the budget itself
    const deleteBudget = await Budget.findByIdAndDelete(budgetId);
    if (!deleteBudget) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Budget not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Budget and associated expenses deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting budget and expenses:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Failed to delete budget and expenses",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
