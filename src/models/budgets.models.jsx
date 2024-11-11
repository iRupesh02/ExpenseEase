import mongoose ,{Schema , model}from "mongoose";

const budgetSchema = new Schema ({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
        required:true
    }
},{timestamps:true})

const Budget = mongoose.models.Budget || model("Budget" , budgetSchema)
export default Budget