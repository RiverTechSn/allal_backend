export declare class CryptoService {
    generateKey(): {
        publicKeyPem: any;
        privateKeyPem: any;
    };
    hash(text: string): string;
    verifiy(text: any, hashedText: any): boolean;
    createKey(): {
        key: any;
        iv: any;
    };
    encrypt(text: any): any;
    decrypt(encryptedText: any): any;
}
