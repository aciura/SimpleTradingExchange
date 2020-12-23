"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const getOrderbook = (req, res) => {
    res.status(200).send(orders_service_1.default.getOrderbook());
};
const getOrderWithId = (req, res) => {
    const order = orders_service_1.default.find(req.params.orderId);
    if (order) {
        res.status(200).send(order);
    }
    else {
        res.status(404).send(new Error('order not found'));
    }
};
const placeOrder = (req, res) => {
    // todo: add order body validation
    const newOrder = {
        price: req.body.price,
        amount: req.body.amount,
        side: req.body.side,
        userId: req.body.userId,
    };
    const orderId = orders_service_1.default.add(newOrder);
    res.status(201).send({ orderId: orderId });
};
const cancelOrder = (req, res) => {
    const result = orders_service_1.default.cancel(req.params.orderId);
    if (result) {
        res.status(200).send({ deleted: result });
    }
    else {
        res.status(404).send();
    }
};
const getOrdersForUser = (req, res) => {
    const orders = orders_service_1.default.getAllForUser(req.params.userId);
    res.status(200).send(orders);
};
exports.default = {
    getOrderbook,
    getOrderWithId,
    placeOrder,
    cancelOrder,
    getOrdersForUser,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL29yZGVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLGdGQUFzRDtBQUV0RCxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQW9CLEVBQUUsR0FBOEIsRUFBRSxFQUFFO0lBQzVFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUNyQixHQUF5QyxFQUN6QyxHQUFvQyxFQUNwQyxFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsd0JBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwRCxJQUFJLEtBQUssRUFBRTtRQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQzVCO1NBQU07UUFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7S0FDbkQ7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUNqQixHQUEyQixFQUMzQixHQUEwQyxFQUMxQyxFQUFFO0lBQ0Ysa0NBQWtDO0lBQ2xDLE1BQU0sUUFBUSxHQUFVO1FBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUN2QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ25CLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07S0FDeEIsQ0FBQTtJQUNELE1BQU0sT0FBTyxHQUFHLHdCQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsR0FBeUMsRUFDekMsR0FBcUIsRUFDckIsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLHdCQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdkQsSUFBSSxNQUFNLEVBQUU7UUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0tBQzFDO1NBQU07UUFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ3ZCO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxDQUN2QixHQUF3QyxFQUN4QyxHQUE4QixFQUM5QixFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsd0JBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUE7QUFFRCxrQkFBZTtJQUNiLFlBQVk7SUFDWixjQUFjO0lBQ2QsVUFBVTtJQUNWLFdBQVc7SUFDWCxnQkFBZ0I7Q0FDakIsQ0FBQSJ9