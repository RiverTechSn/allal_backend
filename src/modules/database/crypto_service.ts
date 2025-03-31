import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as crypto from 'crypto';
import * as fs from 'node:fs';
import * as path from 'path';
const algorithm = 'sha256';
const algorithm2 = 'aes-256-cbc';
@Injectable()
export class CryptoService {
  generateKey() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // la longueur du module en bits
    });

    // Exporter la clé publique et privée en format PEM
    const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });
    const privateKeyPem = privateKey.export({ type: 'pkcs1', format: 'pem' });
    console.log('Clé Publique:', publicKeyPem);
    console.log('Clé Privée:', privateKeyPem);
    return { publicKeyPem, privateKeyPem };
  }
  hash(text: string): string {
    console.log('encrytp');

    const hmac = crypto.createHmac(algorithm, process.env.CRYPTO_KEY);

    // Mettre à jour le HMAC avec les données que vous voulez hacher
    hmac.update('Bonjour le monde');

    // Calculer le digest
    const hash = hmac.digest('hex');
    return hash;
  }
  // createPk() {
  //   const privatePath = path.join('private.pem');
  //   const privateKeyPem = fs.readFileSync(privatePath, 'utf8');
  //   // Créer un objet KeyObject à partir de la clé privée
  //   const privateKeyObject = crypto.createPrivateKey({key:privateKeyPem, length:2048});

  //   // Générer l'objet clé publique à partir de l'objet clé privée
  //   const publicKeyObject = crypto.createPublicKey(privateKeyObject);

  //   // Exporter la clé publique en format PEM
  //   const publicKeyPem = publicKeyObject.export({
  //     type: 'pkcs1',
  //     format: 'pem',
  //   });
  //   fs.writeFileSync('public.pem', publicKeyPem);
  //   console.log('Clé Publique dérivée de la clé Privée:', publicKeyPem);
  // }
  verifiy(text, hashedText) {
    return this.hash(text) === hashedText;
  }
  createKey() {
    const salt = 'monSelUnique';
    const key = crypto.scryptSync(process.env.JWT_SECRET_2, salt, 32);
    const iv = crypto.randomBytes(16);
    return {
      key: key.toString('hex'),
      iv: iv.toString('hex'),
    };
  }
  encrypt(text) {
    const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
    const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
    // Génère un vecteur d'initialisation aléatoire
    const cipher = crypto.createCipheriv(algorithm2, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // On concatène l'IV et le texte chiffré pour pouvoir déchiffrer par la suite
    return encrypted;
  }

  // Fonction pour déchiffrer un texte
  decrypt(encryptedText) {
    const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
    const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
    const decipher = crypto.createDecipheriv(algorithm2, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  // crypt(text: string) {
  //   const publicPath = path.join('public.pem');
  //   const publicKeyPem = fs.readFileSync(publicPath, 'utf8');
  //   // Créer un objet KeyObject à partir de la clé privée
  //   const publicKeyObject = crypto
  //     .publicEncrypt({
  //       key: publicKeyPem,
  //       padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //       oaepHash: "sha256",
  // }, Buffer.from(text))
  //     .toString('base64');
  //     console.log('================encrypt object===========', publicKeyObject);
  //   return publicKeyObject;
  // }
  // decrypt(text:string){
  //   console.log("============encrypt===========",text)
  //   const privatePath = path.join('private.pem');
  //   const privateKeyPem = fs.readFileSync(privatePath, 'utf8');
  //  const decrypt = crypto
  //    .privateDecrypt(
  //      {
  //        key: privateKeyPem,
  //        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  //        oaepHash: 'sha256',
  //      },
  //      Buffer.from(text, 'base64'),
  //    )
  //    .toString('utf-8');
  //  console.log(decrypt)
  //  return decrypt;
  // }
}
