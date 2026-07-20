"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const firebase_1 = require("../../firebase");
class AdminRepository {
    collection = firebase_1.db.collection('admin');
}
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map