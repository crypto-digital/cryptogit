export function caesarEncrypt(text: string, shift: number): string {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return text
    .split('')
    .map((char) => {
      if (ruLower.includes(char)) {
        const index = ruLower.indexOf(char);
        return ruLower[(index + shift) % ruLower.length];
      }
      if (ruUpper.includes(char)) {
        const index = ruUpper.indexOf(char);
        return ruUpper[(index + shift) % ruUpper.length];
      }
      if (enLower.includes(char)) {
        const index = enLower.indexOf(char);
        return enLower[(index + shift) % enLower.length];
      }
      if (enUpper.includes(char)) {
        const index = enUpper.indexOf(char);
        return enUpper[(index + shift) % enUpper.length];
      }
      return char;
    })
    .join('');
}

export function caesarDecrypt(text: string, shift: number): string {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return text
    .split('')
    .map((char) => {
      if (ruLower.includes(char)) {
        const index = ruLower.indexOf(char);
        return ruLower[(index - shift + ruLower.length) % ruLower.length];
      }
      if (ruUpper.includes(char)) {
        const index = ruUpper.indexOf(char);
        return ruUpper[(index - shift + ruUpper.length) % ruUpper.length];
      }
      if (enLower.includes(char)) {
        const index = enLower.indexOf(char);
        return enLower[(index - shift + enLower.length) % enLower.length];
      }
      if (enUpper.includes(char)) {
        const index = enUpper.indexOf(char);
        return enUpper[(index - shift + enUpper.length) % enUpper.length];
      }
      return char;
    })
    .join('');
}

export function vigenereEncrypt(text: string, key: string): string {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const normalizedKey = key.toLowerCase();
  let keyIndex = 0;

  return text
    .split('')
    .map((char) => {
      let alphabet = '';

      if (ruLower.includes(char)) {
        alphabet = ruLower;
      } else if (ruUpper.includes(char)) {
        alphabet = ruUpper;
      } else if (enLower.includes(char)) {
        alphabet = enLower;
      } else if (enUpper.includes(char)) {
        alphabet = enUpper;
      } else {
        return char;
      }

      const charIndex = alphabet.indexOf(char);
      const keyChar = normalizedKey[keyIndex % normalizedKey.length];
      
      let shift = 0;
      if (ruLower.includes(keyChar)) {
        shift = ruLower.indexOf(keyChar);
      } else if (enLower.includes(keyChar)) {
        shift = enLower.indexOf(keyChar);
      }

      keyIndex++;
      return alphabet[(charIndex + shift) % alphabet.length];
    })
    .join('');
}

export function vigenereDecrypt(text: string, key: string): string {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const normalizedKey = key.toLowerCase();
  let keyIndex = 0;

  return text
    .split('')
    .map((char) => {
      let alphabet = '';

      if (ruLower.includes(char)) {
        alphabet = ruLower;
      } else if (ruUpper.includes(char)) {
        alphabet = ruUpper;
      } else if (enLower.includes(char)) {
        alphabet = enLower;
      } else if (enUpper.includes(char)) {
        alphabet = enUpper;
      } else {
        return char;
      }

      const charIndex = alphabet.indexOf(char);
      const keyChar = normalizedKey[keyIndex % normalizedKey.length];
      
      let shift = 0;
      if (ruLower.includes(keyChar)) {
        shift = ruLower.indexOf(keyChar);
      } else if (enLower.includes(keyChar)) {
        shift = enLower.indexOf(keyChar);
      }

      keyIndex++;
      return alphabet[(charIndex - shift + alphabet.length) % alphabet.length];
    })
    .join('');
}

export function atbashEncrypt(text: string): string {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return text
    .split('')
    .map((char) => {
      if (ruLower.includes(char)) {
        const index = ruLower.indexOf(char);
        return ruLower[ruLower.length - 1 - index];
      }
      if (ruUpper.includes(char)) {
        const index = ruUpper.indexOf(char);
        return ruUpper[ruUpper.length - 1 - index];
      }
      if (enLower.includes(char)) {
        const index = enLower.indexOf(char);
        return enLower[enLower.length - 1 - index];
      }
      if (enUpper.includes(char)) {
        const index = enUpper.indexOf(char);
        return enUpper[enUpper.length - 1 - index];
      }
      return char;
    })
    .join('');
}

export function base64Encode(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return 'Ошибка кодирования';
  }
}

export function base64Decode(text: string): string {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch {
    return 'Ошибка: неверный Base64';
  }
}
