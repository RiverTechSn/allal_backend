"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
class BaseResponse {
    constructor() {
        this.totalPage = 0;
    }
    static success(result) {
        const response = new BaseResponse();
        response.result = result;
        response.status = true;
        response.sessionExpired = false;
        return response;
    }
    static successWithPagination(result, count, perPage) {
        const totalPage = Math.ceil(count / perPage);
        const response = new BaseResponse();
        response.result = result;
        response.status = true;
        response.sessionExpired = false;
        response.totalPage = totalPage === 0 ? 1 : totalPage;
        return response;
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=base_response.js.map