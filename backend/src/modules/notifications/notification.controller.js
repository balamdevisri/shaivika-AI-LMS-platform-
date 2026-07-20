"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const notification_service_1 = require("./notification.service");
class NotificationController {
    notificationService;
    constructor() {
        this.notificationService = new notification_service_1.NotificationService();
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map