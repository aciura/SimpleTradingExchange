"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const orderController_1 = __importDefault(require("../controllers/orderController"));
class OrdersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'OrdersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/orders`)
            .get(orderController_1.default.getOrderbook)
            .post(orderController_1.default.placeOrder);
        this.app
            .route(`/orders/:orderId`)
            .all((req, res, next) => {
            // FOR-FUTURE: check user is authenticated, etc
            next();
        })
            .get(orderController_1.default.getOrderWithId)
            .delete(orderController_1.default.cancelOrder);
        return this.app;
    }
}
exports.OrdersRoutes = OrdersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb3JkZXJzL29yZGVycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFtRTtBQUNuRSxxRkFBNEQ7QUFHNUQsTUFBYSxZQUFhLFNBQVEseUNBQWtCO0lBQ2xELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNoQixHQUFHLENBQUMseUJBQWUsQ0FBQyxZQUFZLENBQUM7YUFDakMsSUFBSSxDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFbkMsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsa0JBQWtCLENBQUM7YUFDekIsR0FBRyxDQUNGLENBQ0UsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDMUIsRUFBRTtZQUNGLCtDQUErQztZQUMvQyxJQUFJLEVBQUUsQ0FBQTtRQUNSLENBQUMsQ0FDRjthQUNBLEdBQUcsQ0FBQyx5QkFBZSxDQUFDLGNBQWMsQ0FBQzthQUNuQyxNQUFNLENBQUMseUJBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUV0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUE7SUFDakIsQ0FBQztDQUNGO0FBNUJELG9DQTRCQyJ9