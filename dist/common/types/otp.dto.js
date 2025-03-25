"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCreateDto = exports.OtpBaseDto = void 0;
const omit_type_helper_1 = require("@nestjs/swagger/dist/type-helpers/omit-type.helper");
class OtpBaseDto {
}
exports.OtpBaseDto = OtpBaseDto;
class OtpCreateDto extends (0, omit_type_helper_1.OmitType)(OtpBaseDto, [
    'id',
    'createdAt',
    'updatedAt',
]) {
}
exports.OtpCreateDto = OtpCreateDto;
//# sourceMappingURL=otp.dto.js.map