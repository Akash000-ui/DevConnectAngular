// Polyfill for 'global'
(window as any).global = window;

// Polyfill for Node.js crypto
import * as CryptoJS from 'crypto-js';
(window as any).crypto = {
  getRandomValues: (array: Uint8Array) => {
    const wordArray = CryptoJS.lib.WordArray.random(array.length);
    for (let i = 0; i < array.length; i++) {
      array[i] = wordArray.words[i] >>> 0;
    }
    return array;
  }
};