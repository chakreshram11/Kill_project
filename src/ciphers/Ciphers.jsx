// ✅ Caesar Cipher (Single Function for Both Encrypt & Decrypt)
export const caesarCipher = (text, shift, mode) => {
  if (isNaN(shift)) return "Shift must be a number!";
  if (mode === "decode") shift = 26 - (shift % 26); // Reverse shift for decryption

  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
};

// ✅ Vigenère Cipher (Single Function for Both Encrypt & Decrypt)
export const vigenereCipher = (text, key, mode) => {
  if (!key) return "Key cannot be empty!";
  key = key.toUpperCase();
  let result = "";
  let keyIndex = 0;

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const base = char >= 'a' ? 97 : 65;
      let shift = key[keyIndex % key.length].charCodeAt(0) - 65;
      if (mode === "decode") shift = 26 - shift; // Reverse shift for decryption

      result += String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
};

// ✅ XOR Cipher (Same for Encrypt & Decrypt)
export const xorCipher = (text, key) => {
  if (!key) return "Key cannot be empty!";
  
  return text.split("").map((char, i) => 
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join("");
};
