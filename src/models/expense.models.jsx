import mongoose ,{Schema , model}from "mongoose";
import Budget from "./budgets.models";

const expenseSchema = new Schema ({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    budgetId:{
        type:Schema.Types.ObjectId,
        ref:"Budget"
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
},{timestamps:true})

const Expense = mongoose.models.Expense || model("Expense" , expenseSchema)
export default Expense