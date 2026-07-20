"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_repository_1 = require("./admin.repository");
class AdminService {
    adminRepository;
    constructor() {
        this.adminRepository = new admin_repository_1.AdminRepository();
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map