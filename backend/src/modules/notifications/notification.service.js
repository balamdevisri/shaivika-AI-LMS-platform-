"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_1 = require("./notification.repository");
class NotificationService {
    notificationRepository;
    constructor() {
        this.notificationRepository = new notification_repository_1.NotificationRepository();
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map