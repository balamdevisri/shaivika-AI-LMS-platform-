"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebase_1 = require("../../firebase");
class UserRepository {
    collection = firebase_1.db.collection('users');
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map