"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const certificate_service_1 = require("./certificate.service");
class CertificateController {
    certificateService;
    constructor() {
        this.certificateService = new certificate_service_1.CertificateService();
    }
}
exports.CertificateController = CertificateController;
//# sourceMappingURL=certificate.controller.js.map