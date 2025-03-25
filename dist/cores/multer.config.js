"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileInterCeptorTmp = exports.filesInterCeptorImg = exports.fileInterCeptorImg = exports.filesInterCeptor = exports.storageCustom = exports.fileInterCeptor = exports.MulterConfig = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
exports.MulterConfig = platform_express_1.MulterModule.register({
    preservePath: false,
    dest: 'upload',
    storage: (0, multer_1.diskStorage)({
        destination: 'upload',
    }),
});
const fileInterCeptor = (path) => (0, platform_express_1.FileInterceptor)('file', {
    dest: 'upload',
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            console.log('------------------destination file-------------------');
            console.log(file);
            console.log(file);
            cb(null, `upload/${path}`);
        },
        filename: (req, file, callback) => {
            console.log('------------------destination file name-------------------');
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
});
exports.fileInterCeptor = fileInterCeptor;
;
exports.storageCustom = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        console.log('------------------destination file-------------------');
        console.log(file);
        console.log(file);
        cb(null, `upload/img`);
    },
    filename: (req, file, callback) => {
        console.log('------------------destination file name-------------------');
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
    },
});
const filesInterCeptor = (path) => (0, platform_express_1.FilesInterceptor)('file', 10, {
    dest: 'upload',
    storage: exports.storageCustom
});
exports.filesInterCeptor = filesInterCeptor;
exports.fileInterCeptorImg = (0, exports.fileInterCeptor)('img');
exports.filesInterCeptorImg = (0, exports.filesInterCeptor)('img');
exports.fileInterCeptorTmp = (0, exports.fileInterCeptor)('tmp');
//# sourceMappingURL=multer.config.js.map