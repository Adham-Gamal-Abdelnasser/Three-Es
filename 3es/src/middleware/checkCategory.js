import categoryModel from "../../dbConnection/models/category.model.js";

import { AppError } from "../utils/AppError.js";
import { catchError } from "./handleError.js";

export const checkCategory= catchError(async(req,res,next)=>{
    let category= await categoryModel.findOne({_id:req.body.category});
    if(!category) return next(new AppError("Category not found",404));
    else{
        next()
    }
})