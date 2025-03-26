"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFactory = void 0;
const client_1 = require("@prisma/client");
const exclude_key_1 = require("../../../cores/exclude_key");
const createFactory = ({ db, crypto, mailer, body }) => {
    console.log(body);
    return db.user
        .create({
        data: {
            ...(0, exclude_key_1.excludeFields)(body, ['password']),
            walletBase: { create: { type: 'USER' } },
            login: {
                create: {
                    ...body.login,
                    username: body.email,
                    type: client_1.LoginEnum.USER,
                    password: crypto.hash(body.password),
                },
            },
        },
        include: { login: true },
    })
        .then((user) => {
        const code = crypto.encrypt(`${user.loginId}_${new Date().getTime()}`);
        return db.otp
            .create({
            data: {
                via: 'MAIL',
                duration: 'HOUR_12',
                code: code,
                loginId: user.loginId,
            },
        })
            .then(() => {
            return mailer
                .sendUserConfirmation({
                email: 'djiga2015@gmail.com',
                token: code,
            })
                .then(() => user);
        });
    })
        .then((val) => val);
};
exports.createFactory = createFactory;
//# sourceMappingURL=create_user.factory.js.map