
import cartRoutes from "./cart/cart.routes.js";
import categoryRoutes from "./category/category.routes.js";
import clientRoutes from "./client/client.routes.js";
import orderRoutes from "./order/order.routes.js";
import productRoutes from "./product/product.routes.js";
import roomRoutes from "./room/room.routes.js";
import unitRoutes from "./unit/unit.routes.js";

export const allRoutes = (app) => {
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/product", productRoutes);
  app.use("/api/v1/unit", unitRoutes);
  app.use("/api/v1/client", clientRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/room", roomRoutes);



};
