// ✅ Base64 Encode/Decode (Handles Unicode properly)
export const base64Converter = (text, mode) => {
  try {
    if (mode === "encode") {
      return btoa(unescape(encodeURIComponent(text)));
    } else if (mode === "decode") {
      return decodeURIComponent(escape(atob(text)));
    }
    return "Invalid mode! Use 'encode' or 'decode'.";
  } catch (e) {
    return "Invalid Base64 input!";
  }
};

// ✅ URL Encode/Decode
export const urlConverter = (text, mode) => {
  try {
    return mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
  } catch (e) {
    return "Invalid URL encoding!";
  }
};

// ✅ Morse Code Encode/Decode (Supports letters, numbers & symbols)
const morseCodeMap = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.",
  "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.",
  "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
  "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "/": "-..-.", "@": ".--.-.",
  "-": "-....-", "(": "-.--.", ")": "-.--.-", "&": ".-...", " ": "/"
};
const reverseMorseCodeMap = Object.fromEntries(Object.entries(morseCodeMap).map(([k, v]) => [v, k]));

export const morseConverter = (text, mode) => {
  if (mode === "encode") {
    return text.toUpperCase().split("").map(char => morseCodeMap[char] || char).join(" ");
  } else if (mode === "decode") {
    return text.split(" ").map(code => reverseMorseCodeMap[code] || "").join("");
  }
  return "Invalid mode! Use 'encode' or 'decode'.";
};

// ✅ ASCII Encode/Decode
export const asciiConverter = (text, mode) => {
  if (mode === "encode") {
    return text.split("").map(char => char.charCodeAt(0)).join(" ");
  } else if (mode === "decode") {
    return text.split(" ").map(code => String.fromCharCode(Number(code))).join("");
  }
  return "Invalid mode! Use 'encode' or 'decode'.";
};