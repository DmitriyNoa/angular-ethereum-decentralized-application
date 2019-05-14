import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HexEncodeDecodeService {
  // TO DO: Write pure js implementation for decodding the results;
  constructor() {
    this.hexToAscii("");


    this.hexadecimalNumberToDecimal(16);
  }

  hexToAscii(hexString) {
    const hex  = hexString.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;

    // 10
  }


  hexadecimalNumberToDecimal(hexNumber) {
    const hexString = hexNumber.toString(16);
    return parseInt(hexString, 10);
  }
}
