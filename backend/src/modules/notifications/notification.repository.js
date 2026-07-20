"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const firebase_1 = require("../../firebase");
class NotificationRepository {
    collection = firebase_1.db.collection('notifications');
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notification.repository.js.map