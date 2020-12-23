"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const uuid_1 = require("uuid");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('orders');
const buyOrders = new Map();
const sellOrders = new Map();
function getOrderbook() {
    return [...buyOrders.values(), ...sellOrders.values()];
}
function findOrder(orderId) {
    var _a;
    const order = (_a = sellOrders.get(orderId)) !== null && _a !== void 0 ? _a : buyOrders.get(orderId);
    return order;
}
function addOrder(order) {
    log(`PLACED ${order.side} @ ${order.price} ${order.amount}`);
    order.orderId = uuid_1.v4();
    switch (order.side) {
        case order_1.OrderSide.Buy: {
            const ordersToRemove = [];
            sellOrders.forEach((sellOrder) => {
                // TODO: make it more readable
                if (order.amount > 0 && sellOrder.price <= order.price) {
                    const amountFilled = Math.min(order.amount, sellOrder.amount);
                    sellOrder.amount -= amountFilled;
                    order.amount -= amountFilled;
                    if (sellOrder.amount === 0) {
                        ordersToRemove.push(sellOrder.orderId);
                        log(`FILLED ${sellOrder.side} @ ${sellOrder.price} ${sellOrder.amount}`);
                    }
                    if (order.amount <= 0) {
                        log(`FILLED ${order.side} @ ${order.price} ${order.amount}`);
                    }
                }
            });
            ordersToRemove.forEach((orderId) => {
                sellOrders.delete(orderId);
            });
            if (order.amount > 0)
                buyOrders.set(order.orderId, order);
            break;
        }
        case order_1.OrderSide.Sell:
            sellOrders.set(order.orderId, order);
            break;
        default:
            throw new Error('Wrong order side: ' + order.side);
    }
    return order.orderId;
}
function cancelOrder(orderId) {
    const order = findOrder(orderId);
    if (!order) {
        return false;
    }
    if (order.side === order_1.OrderSide.Buy) {
        buyOrders.delete(orderId);
    }
    else {
        sellOrders.delete(orderId);
    }
    log(`CANCELLED ${order.side} @ ${order.price} ${order.amount}`);
    return true;
}
function getOrdersForUser(userId) {
    const orders = [];
    buyOrders.forEach((o) => {
        if (o.userId === userId)
            orders.push(o);
    });
    sellOrders.forEach((o) => {
        if (o.userId === userId)
            orders.push(o);
    });
    return orders;
}
exports.default = {
    find: findOrder,
    getOrderbook,
    add: addOrder,
    cancel: cancelOrder,
    getAllForUser: getOrdersForUser,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvb3JkZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBa0Q7QUFDbEQsK0JBQW1DO0FBQ25DLGtEQUF5QjtBQUN6QixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBRTVDLE1BQU0sU0FBUyxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQy9DLE1BQU0sVUFBVSxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFBO0FBRWhELFNBQVMsWUFBWTtJQUNuQixPQUFPLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUN4RCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBZTs7SUFDaEMsTUFBTSxLQUFLLFNBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUNBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxLQUFZO0lBQzVCLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUM1RCxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQU0sRUFBRSxDQUFBO0lBRXhCLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNsQixLQUFLLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFBO1lBQ25DLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDL0IsOEJBQThCO2dCQUM5QixJQUFJLEtBQUssQ0FBQyxN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