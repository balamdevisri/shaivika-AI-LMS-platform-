"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
const controller = new notification_controller_1.NotificationController();
// Define routes here
exports.default = router;
//# sourceMappingURL=notification.routes.js.map