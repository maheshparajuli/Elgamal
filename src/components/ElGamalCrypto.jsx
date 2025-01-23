class ElGamalCrypto {
  static modPow(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    return result;
  }

  static generateKeys(p, alpha, privateKey) {
    if (p <= 2) throw new Error('Prime p must be greater than 2');
    
    const a = privateKey || Math.floor(Math.random() * (p - 2)) + 1;
    const beta = this.modPow(alpha, a, p);
    
    return {
      publicKey: { p, alpha, beta },
      privateKey: a
    };
  }

  static encrypt(message, publicKey) {
    const { p, alpha, beta } = publicKey;
    const charCodes = message.split('').map((char) => char.charCodeAt(0));
    
    return charCodes.map((charCode) => {
      const k = Math.floor(Math.random() * (p - 2)) + 1;
      const gamma = this.modPow(alpha, k, p);
      const delta = (charCode * this.modPow(beta, k, p)) % p;
      
      return { gamma, delta };
    });
  }

  static decrypt(encryptedBlocks, privateKey, p) {
    return encryptedBlocks.map(({ gamma, delta }) => {
      // Calculate shared secret
      const s = this.modPow(gamma, privateKey, p);
      
      // Find modular multiplicative inverse
      const sInverse = this.findModInverse(s, p);
      
      // Decrypt the message
      const decryptedCharCode = (delta * sInverse) % p;
      
      // Additional validation to ensure the decrypted character code is valid
      if (decryptedCharCode < 0 || decryptedCharCode > 65535) {
        console.warn(`Invalid character code: ${decryptedCharCode}`);
        return 0; // Return a safe default value
      }
      
      return decryptedCharCode;
    });
  }

  static findModInverse(a, m) {
    // Extended Euclidean algorithm for modular multiplicative inverse
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;
    
    if (m === 1) return 0;
    
    while (a > 1) {
      q = Math.floor(a / m);
      t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    
    if (x1 < 0) x1 += m0;
    return x1;
  }

  static charCodesToString(charCodes) {
    // Added error handling and filtering
    const filteredCodes = charCodes.filter(code => code > 0 && code <= 65535);
    return filteredCodes.map((code) => String.fromCharCode(code)).join('');
  }
}

export default ElGamalCrypto;