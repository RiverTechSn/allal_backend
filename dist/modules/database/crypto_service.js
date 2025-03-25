"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const crypto = require("crypto");
const algorithm = 'sha256';
const algorithm2 = 'aes-256-cbc';
let CryptoService = class CryptoService {
    generateKey() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });
        const privateKeyPem = privateKey.export({ type: 'pkcs1', format: 'pem' });
        console.log('Clé Publique:', publicKeyPem);
        console.log('Clé Privée:', privateKeyPem);
        return { publicKeyPem, privateKeyPem };
    }
    hash(text) {
        console.log('encrytp');
        const hmac = crypto.createHmac(algorithm, process.env.CRYPTO_KEY);
        hmac.update('Bonjour le monde');
        const hash = hmac.digest('hex');
        return hash;
    }
    verifiy(text, hashedText) {
        return this.hash(text) === hashedText;
    }
    createKey() {
        const salt = 'monSelUnique';
        const key = crypto.scryptSync(process.env.JWT_SECRET_2, salt, 32);
        const iv = crypto.randomBytes(16);
        return {
            key: key.toString("hex"),
            iv: iv.toString("hex")
        };
    }
    encrypt(text) {
        const key = Buffer.from(process.env.SECRET_KEY, 'hex');
        const iv = Buffer.from(process.env.SECRET_IV, 'hex');
        const cipher = crypto.createCipheriv(algorithm2, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encryptedText) {
        const iv = Buffer.from(process.env.SECRET_IV, 'hex');
        const key = Buffer.from(process.env.SECRET_KEY, 'hex');
        const decipher = crypto.createDecipheriv(algorithm2, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, injectable_decorator_1.Injectable)()
], CryptoService);
//# sourceMappingURL=crypto_service.js.map