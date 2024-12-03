import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields,} from "../../utils/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getAllProductsByCategoryId, getProductById, updateProduct } from "./controller/product.controller.js";
import { addProductSchema as addProductSchema, getByIdSchema, updateProductSchema } from "./product.validation.js";
import { checkCategory } from "../../middleware/checkCategory.js";

const productRoutes = express.Router({mergeParams:true});
productRoutes
  .route("/")
  .post(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]), validation(addProductSchema),checkCategory, addProduct)
  .get(getAllProducts)
  .get(checkCategory,getAllProductsByCategoryId);

productRoutes
  .route("/:id")

  .get(validation(getByIdSchema), getProductById)
  .patch(uploadFields([{name:"imgCover",maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema), updateProduct)
  .delete(validation(getByIdSchema), deleteProduct);

export default productRoutes;
