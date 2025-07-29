import { pbkdf2Sync } from 'crypto';

export function encryptText(textToEncrypt) {
  //Salt para robusteser la clave
  const salt = '57b3ed493612102ede4ded8ca4b1ac5b';

  // Derivar una clave del password y el salt usando PBKDF2
  const claveDerivada = pbkdf2Sync(textToEncrypt, salt, 100000, 64, 'sha512');

  // Devolver el salt y la clave derivada en formato hexadecimal
  return claveDerivada.toString('hex');
}
