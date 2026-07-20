"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const firebase_1 = require("../../firebase");
class AuthRepository {
    collection = firebase_1.db.collection('auth');
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map