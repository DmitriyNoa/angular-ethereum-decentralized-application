import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HexEncodeDecodeService {
  // TO DO: Write pure js implementation for decodding the results;
  constructor() {
  }

  hexToAscii(hexString) {
    const hex  = hexString.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  prepandToEthereumNumber(hexNumber) {
    const hexStringNumber = hexNumber.toString();
    const zeroArraylength = 64 - hexStringNumber.length;
    const zeroArray = new Array(zeroArraylength).fill(0);
    return `0x${zeroArray.join('')}${hexNumber}`;
  }

  decimalToEthereumHexadecimal(decimalNumber) {
    const hexadecimaNumberString = (decimalNumber << 0).toString(16);
    return this.prepandToEthereumNumber(hexadecimaNumberString);
  }

  asciiToHexadecimal(str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n ++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  hexadecimalNumberToDecimal(hexNumber) {
    const hexString = hexNumber.toString(16);
    return parseInt(hexString, 10);
  }
}
