export declare class CryptoService {
    generateKey(): {
        publicKeyPem: string | Buffer<ArrayBufferLike>;
        privateKeyPem: string | Buffer<ArrayBufferLike>;
    };
    hash(text: string): string;
    verifiy(text: any, hashedText: any): boolean;
    createKey(): {
        key: string;
        iv: string;
    };
    encrypt(text: any): string;
    decrypt(encryptedText: any): string;
}
