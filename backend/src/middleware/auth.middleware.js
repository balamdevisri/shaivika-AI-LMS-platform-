"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.requireAuth = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError_1.ApiError(401, 'Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await firebase_1.adminAuth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, 'Invalid token');
    }
});
//# sourceMappingURL=auth.middleware.js.map