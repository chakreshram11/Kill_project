export const rot13Encrypt = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char < 'a' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
};

export const rot13Decrypt = rot13Encrypt; // ROT13 is self-reversible

export const atbashEncrypt = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char < 'a' ? 65 : 97;
    return String.fromCharCode(25 - (char.charCodeAt(0) - base) + base);
  });
};

export const atbashDecrypt = atbashEncrypt; // Atbash is also self-reversible

export const railFenceEncrypt = (text, rails) => {
  if (rails < 2) return text;
  let fence = Array.from({ length: rails }, () => []);
  let rail = 0, direction = 1;
  
  for (let char of text) {
    fence[rail].push(char);
    rail += direction;
    if (rail === rails - 1 || rail === 0) direction *= -1;
  }

  return fence.flat().join('');
};

export const railFenceDecrypt = (text, rails) => {
  if (rails < 2) return text;
  let fence = Array.from({ length: rails }, () => []);
  let rail = 0, direction = 1, index = 0;

  for (let i = 0; i < text.length; i++) {
    fence[rail].push(null);
    rail += direction;
    if (rail === rails - 1 || rail === 0) direction *= -1;
  }

  for (let row of fence) {
    for (let j = 0; j < row.length; j++) {
      row[j] = text[index++];
    }
  }

  rail = 0;
  direction = 1;
  return text.split('').map(() => {
    let char = fence[rail].shift();
    rail += direction;
    if (rail === rails - 1 || rail === 0) direction *= -1;
    return char;
  }).join('');
};
