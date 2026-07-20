"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateRepository = void 0;
const firebase_1 = require("../../firebase");
class CertificateRepository {
    collection = firebase_1.db.collection('certificates');
}
exports.CertificateRepository = CertificateRepository;
//# sourceMappingURL=certificate.repository.js.map