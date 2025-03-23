const baconCipherMap = {
  A: "AAAAA", B: "AAAAB", C: "AAABA", D: "AAABB", E: "AABAA",
  F: "AABAB", G: "AABBA", H: "AABBB", I: "ABAAA", J: "ABAAB",
  K: "ABABA", L: "ABABB", M: "ABBAA", N: "ABBAB", O: "ABBBA",
  P: "ABBBB", Q: "BAAAA", R: "BAAAB", S: "BAABA", T: "BAABB",
  U: "BABAA", V: "BABAB", W: "BABBA", X: "BABBB", Y: "BBAAA",
  Z: "BBAAB"
};

export const baconsCipherEncrypt = (text) => {
  return text.toUpperCase().replace(/[A-Z]/g, char => baconCipherMap[char] || char);
};

export const baconsCipherDecrypt = (text) => {
  return text.match(/.{5}/g)?.map(code => 
    Object.keys(baconCipherMap).find(key => baconCipherMap[key] === code) || " "
  ).join('') || text;
};

export const customAlphabetEncrypt = (text, customAlphabet) => {
  const originalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return text.toUpperCase().replace(/[A-Z]/g, char => 
    customAlphabet[originalAlphabet.indexOf(char)] || char
  );
};

export const customAlphabetDecrypt = (text, customAlphabet) => {
  const originalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return text.toUpperCase().replace(/[A-Z]/g, char => 
    originalAlphabet[customAlphabet.indexOf(char)] || char
  );
};
