"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificate_controller_1 = require("./certificate.controller");
const router = (0, express_1.Router)();
const controller = new certificate_controller_1.CertificateController();
// Define routes here
exports.default = router;
//# sourceMappingURL=certificate.routes.js.map