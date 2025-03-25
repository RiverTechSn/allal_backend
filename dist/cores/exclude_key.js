"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
const excludeFields = (obj, keys) => {
    const result = { ...obj };
    keys.forEach((key) => {
        delete result[key];
    });
    return result;
};
exports.excludeFields = excludeFields;
//# sourceMappingURL=exclude_key.js.map