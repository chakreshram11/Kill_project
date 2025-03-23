export const polybiusSquareEncrypt = (text) => {
    const square = {
      'A': '11', 'B': '12', 'C': '13', 'D': '14', 'E': '15',
      'F': '21', 'G': '22', 'H': '23', 'I': '24', 'J': '24', 'K': '25',
      'L': '31', 'M': '32', 'N': '33', 'O': '34', 'P': '35',
      'Q': '41', 'R': '42', 'S': '43', 'T': '44', 'U': '45',
      'V': '51', 'W': '52', 'X': '53', 'Y': '54', 'Z': '55'
    };
    return text.toUpperCase().replace(/[A-Z]/g, char => square[char] || char);
  };
  
  export const polybiusSquareDecrypt = (text) => {
    const square = {
      '11': 'A', '12': 'B', '13': 'C', '14': 'D', '15': 'E',
      '21': 'F', '22': 'G', '23': 'H', '24': 'I/J', '25': 'K',
      '31': 'L', '32': 'M', '33': 'N', '34': 'O', '35': 'P',
      '41': 'Q', '42': 'R', '43': 'S', '44': 'T', '45': 'U',
      '51': 'V', '52': 'W', '53': 'X', '54': 'Y', '55': 'Z'
    };
    return text.match(/\d{2}|./g).map(num => square[num] || num).join('');
  };



  
  
  const polybiusSquare = {
    A: "11", B: "12", C: "13", D: "14", E: "15",
    F: "21", G: "22", H: "23", I: "24", J: "24", K: "25",
    L: "31", M: "32", N: "33", O: "34", P: "35",
    Q: "41", R: "42", S: "43", T: "44", U: "45",
    V: "51", W: "52", X: "53", Y: "54", Z: "55"
  };
  
  // Reverse lookup for decryption
  const reversePolybius = Object.fromEntries(Object.entries(polybiusSquare).map(([k, v]) => [v, k]));
  
  
  export const bifidEncrypt = (text) => {
    const sanitizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
  
    let rowPart = '', colPart = '';
    let coordinates = sanitizedText.split('').map(char => polybiusSquare[char] || '');
  
    for (let coord of coordinates) {
      rowPart += coord[0]; // First digit is row
      colPart += coord[1]; // Second digit is column
    }
  
    // Combine row and column parts
    let mixedCoords = rowPart + colPart;
    let encryptedText = mixedCoords.match(/../g).map(num => reversePolybius[num]).join('');
  
    return encryptedText;
  };

  export const bifidDecrypt = (text) => {
    const sanitizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
  
    // Convert text to Polybius coordinates
    let fullCoords = sanitizedText.split('').map(char => polybiusSquare[char] || '').join('');
  
    // Split coordinates into two halves
    let half = fullCoords.length / 2;
    let rowPart = fullCoords.slice(0, half);
    let colPart = fullCoords.slice(half);
  
    // Reconstruct original letters
    let decryptedText = rowPart.split('').map((r, i) => reversePolybius[r + colPart[i]]).join('');
  
    return decryptedText;
  };
  






  const trifidGrid = {
    A: "111", B: "112", C: "113", D: "121", E: "122", F: "123",
    G: "131", H: "132", I: "133", J: "211", K: "212", L: "213",
    M: "221", N: "222", O: "223", P: "231", Q: "232", R: "233",
    S: "311", T: "312", U: "313", V: "321", W: "322", X: "323",
    Y: "331", Z: "332"
  };
  const reverseTrifidGrid = Object.fromEntries(Object.entries(trifidGrid).map(([k, v]) => [v, k]));

  

  export const trifidEncrypt = (text) => {
    const sanitizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    let coords = sanitizedText.split('').map(letter => trifidGrid[letter] || '').join('');
    let rowPart = '', colPart = '', depthPart = '';
  
    for (let i = 0; i < coords.length; i += 3) {
      rowPart += coords[i];
      colPart += coords[i + 1];
      depthPart += coords[i + 2];
    }
  
    let mixedCoords = rowPart + colPart + depthPart;
    let encryptedText = mixedCoords.match(/.../g).map(num => reverseTrifidGrid[num]).join('');
  
    return encryptedText;
  };

  export const trifidDecrypt = (text) => {
    const sanitizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    let coords = sanitizedText.split('').map(letter => trifidGrid[letter] || '').join('');
    let blockSize = coords.length / 3;
  
    let merged = '';
    for (let i = 0; i < blockSize; i++) {
      merged += coords[i] + coords[i + blockSize] + coords[i + 2 * blockSize];
    }
  
    let decryptedText = merged.match(/.../g).map(num => reverseTrifidGrid[num]).join('');
  
    return decryptedText;
  };
    