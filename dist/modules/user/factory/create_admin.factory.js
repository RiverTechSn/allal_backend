"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminFactory = void 0;
const default_1 = require(".prisma/client/default");
const createAdminFactory = (db, config, crypto) => {
    const email = config.getOrThrow('SUPER_ADMIN_EMAIL');
    const phone = config.getOrThrow('SUPER_ADMIN_PHONE');
    const role = config.getOrThrow('SUPER_ADMIN_ROLE');
    const displayname = config.getOrThrow('SUPER_ADMIN_DISPLAYNAME');
    const password = crypto.hash(config.getOrThrow('SUPER_ADMIN_PASSWORD'));
    return db.user.findFirst({ where: { email: email } }).then((exist) => {
        console.log(exist);
        if (!exist)
            return db.user.create({
                data: {
                    email: email,
                    displayname,
                    phone,
                    address: '',
                    walletBase: { create: { type: 'USER' } },
                    login: {
                        connectOrCreate: {
                            create: {
                                username: email,
                                password: password,
                                type: default_1.LoginEnum.USER,
                                role: {
                                    connectOrCreate: {
                                        create: { name: role },
                                        where: { name: role },
                                    },
                                },
                            },
                            where: {
                                type_username: { username: email, type: default_1.LoginEnum.USER },
                            },
                        },
                    },
                },
            });
    });
};
exports.createAdminFactory = createAdminFactory;
//# sourceMappingURL=create_admin.factory.js.map