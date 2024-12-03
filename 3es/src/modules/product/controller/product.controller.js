import slugify from "slugify";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import ProductModel from "../../../../dbConnection/models/Product.model.js";


const addProduct = catchError(async (req, res) => {

    req.body.slug = slugify(req.body.title);
    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images= req.files.images.map(ele=>ele.filename)
    let preProduct = new ProductModel(req.body);
    let addedProduct = await preProduct.save();
    res.json({ message: "Added", addedProduct });
  });
  const getAllProductsByCategoryId = catchError(async (req, res) => {
    let apiFeatures= new ApiFeatures(ProductModel.find(),req.query).pagination().search().filter().fields().sort()
     let allProducts = await apiFeatures.mongooseQuery;
     res.json({ message: "Done", page:apiFeatures.page, allProducts });
   }); 
   const getAllProducts = catchError(async (req, res) => {

    let query = ProductModel.find();
    
    if (req.params.category) {
        query = query.where('category', req.params.category);
    }

    let apiFeatures = new ApiFeatures(query, req.query)
        .pagination()
        .search()
        .filter()
        .fields()
        .sort();

    let allProducts = await apiFeatures.mongooseQuery;

    res.json({ message: "Done", page: apiFeatures.page, allProducts });
});
   const getProductById = catchError(async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    let product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json({ message: "product retrieved successfully", product });
  });
const updateProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  if(req.files.imageCover)req.body.imageCover =req.files.imageCover[0].filename;
  if(req.files.images)req.body.images =req.files.images.map(ele=>ele.filename);
  let updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });
  updatedProduct && res.json({ message: "Done", updatedProduct });
  !updatedProduct && res.json(new AppError({ message: "Product Not Found" },404));
});
const deleteProduct = catchError(async (req, res) => {
  let deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
  deletedProduct && res.json({ message: "Done", deletedProduct });
  !deletedProduct && res.json(new AppError({ message: "Product Not Found" },404));
});

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProductsByCategoryId
};
