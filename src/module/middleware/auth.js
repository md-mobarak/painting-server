"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Unauthorized user access",
        });
    }
    let verifiedToken;
    try {
        // Get authorization token
        const token = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        // console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Access denied",
            });
        }
        // Verify the token
        verifiedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET);
        // console.log(verifiedToken);
        // Assign the user to the request object
        req.user = verifiedToken;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: err.message,
        });
    }
});
exports.default = auth;
