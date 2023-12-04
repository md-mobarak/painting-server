"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const zodUserSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    location: zod_1.z.string(),
    role: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
    profileImg: zod_1.z.string(),
});
// Define a separate validation function
const validateUser = (data) => {
    return zodUserSchema.safeParse(data);
};
exports.validateUser = validateUser;
