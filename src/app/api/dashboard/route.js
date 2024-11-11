'use server'

import dbConnect from "../../../lib/dbconfig";
import Budget from "../../../models/budgets.models";

export async function POST(req) {
  await dbConnect();
  try {
    const { email } = await req.json();  
    const result = await Budget.find({ createdBy: email });

    if (result?.length==0) {
      return new Response(
        JSON.stringify({ success: false, message: "Budget not found" , data:[] }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify(result),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching budget:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
