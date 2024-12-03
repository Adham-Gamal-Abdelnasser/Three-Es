import categoryModel from "../../../../dbConnection/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";


const addCategory = catchError(async (req, res) => {
 
    req.body.slug = slugify(req.body.title);
    req.body.image=req.file.filename
    let preCategory = new categoryModel(req.body);
    let addedCategory = await preCategory.save();
    res.json({ message: "Added", addedCategory });

  });
  const getAllCategories = catchError(async (req, res) => {
    let apiFeatures= new ApiFeatures(categoryModel.find(),req.query).search().filter().fields().sort()
  
    let allCategories = await apiFeatures.mongooseQuery;
    res.json({ message: "Done",page:apiFeatures.page,allCategories });
  });
  const getCategoryById = catchError(async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    let category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category retrieved successfully", category });
  });
const updateCategory = catchError( async (req, res) => {
  req.body.slug = slugify(req.body.title);
  let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });
  updatedCategory && res.json({ message: "Done", updatedCategory });
  !updatedCategory && res.json(new AppError({ message: "Category Not Found" },404));
});
const deleteCategory = catchError( async (req, res) => {
  let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
  deletedCategory && res.json({ message: "Done", deletedCategory });
  !deletedCategory && res.json(new AppError({ message: "Category Not Found" },404));
});

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
