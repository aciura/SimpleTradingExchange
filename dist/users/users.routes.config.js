"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const userController_1 = __importDefault(require("../controllers/userController"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(userController_1.default.getListOfUsers)
            .post(userController_1.default.addUser);
        this.app
            .route(`/users/:userId`)
            .all((req, res, next) => {
            // FOR-FUTURE: check if user is authenticated here
            next();
        })
            .get(userController_1.default.getUserWithId);
        this.app
            .route('/users/:userId/orders')
            .get(orderController_1.default.getOrdersForUser);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2Vycy91c2Vycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFtRTtBQUNuRSxtRkFBMEQ7QUFFMUQscUZBQTREO0FBRTVELE1BQWEsV0FBWSxTQUFRLHlDQUFrQjtJQUNqRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQUMsd0JBQWMsQ0FBQyxjQUFjLENBQUM7YUFDbEMsSUFBSSxDQUFDLHdCQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFL0IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUNGLENBQ0UsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDMUIsRUFBRTtZQUNGLGtEQUFrRDtZQUNsRCxJQUFJLEVBQUUsQ0FBQTtRQUNSLENBQUMsQ0FDRjthQUNBLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRXBDLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLHVCQUF1QixDQUFDO2FBQzlCLEdBQUcsQ0FBQyx5QkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFFeEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBQ2pCLENBQUM7Q0FDRjtBQS9CRCxrQ0ErQkMifQ==