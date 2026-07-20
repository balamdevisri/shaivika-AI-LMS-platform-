"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const certificate_repository_1 = require("./certificate.repository");
class CertificateService {
    certificateRepository;
    constructor() {
        this.certificateRepository = new certificate_repository_1.CertificateRepository();
    }
}
exports.CertificateService = CertificateService;
//# sourceMappingURL=certificate.service.js.map