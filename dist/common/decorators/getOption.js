"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionalOption = void 0;
const getOptionalOption = (option) => {
    if (!option)
        option = { apiPropertyOptions: { required: false } };
    else if (!option.apiPropertyOptions)
        option.apiPropertyOptions = { required: false };
    else
        option.apiPropertyOptions.required = false;
    return option;
};
exports.getOptionalOption = getOptionalOption;
//# sourceMappingURL=getOption.js.map