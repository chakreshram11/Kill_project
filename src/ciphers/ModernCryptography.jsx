export const rc4Encrypt = (key, plaintext) => {
    let S = Array.from({ length: 256 }, (_, i) => i);
    let j = 0, keyLength = key.length;
  
    // Key scheduling
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + key.charCodeAt(i % keyLength)) % 256;
      [S[i], S[j]] = [S[j], S[i]]; // Swap
    }
  
    let i = 0, k = 0, ciphertext = '';
    for (let char of plaintext) {
      i = (i + 1) % 256;
      k = (k + S[i]) % 256;
      [S[i], S[k]] = [S[k], S[i]]; // Swap
      let keystream = S[(S[i] + S[k]) % 256];
      ciphertext += String.fromCharCode(char.charCodeAt(0) ^ keystream);
    }
  
    return btoa(ciphertext); // Convert to Base64 for safe output
  };
  
  export const rc4Decrypt = (key, ciphertext) => {
    return rc4Encrypt(key, atob(ciphertext)); // RC4 encryption is symmetric
  };

  
  export const aesEncrypt = async (key, plaintext) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw", encoder.encode(key), { name: "AES-GCM" }, false, ["encrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Random IV
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv }, keyMaterial, data
    );
  
    return { ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))), iv: btoa(String.fromCharCode(...iv)) };
  };
  
  export const aesDecrypt = async (key, ciphertext, iv) => {
    const decoder = new TextDecoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw", new TextEncoder().encode(key), { name: "AES-GCM" }, false, ["decrypt"]
    );
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(atob(iv).split("").map(c => c.charCodeAt(0))) },
      keyMaterial, new Uint8Array(atob(ciphertext).split("").map(c => c.charCodeAt(0)))
    );
  
    return decoder.decode(decrypted);
  };

  
  export const hashSHA256 = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  };
  