import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HexEncodeDecodeService {
  // TO DO: Write pure js implementation for decodding the results;

  public dataTypes = {
    dynamic: ['string', 'bytes'],
    simple: ['uint8', 'uint16', 'uint32',  'uint64',  'uint128',  'uint256', 'bool', 'address']
  }

  constructor() {
  }

  getDataType(type) {
    if(this.dataTypes.dynamic.indexOf(type) !== -1 ) {
      return 'dynamic';
    } else {
      return 'simple';
    }
  }

  hexToAscii(hexString) {
    const hex = hexString.toString();
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
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  hexadecimalNumberToDecimal(hexNumber: string) {
    return Number(`0x${hexNumber}`);
  }


  splitBy32bytes(str) {
    const chunks = [];
    const strArray = str.split('');
    while (strArray.length) {
      chunks.push(strArray.splice(0, 64).join(''));
    }
    return chunks;
  }

  removeInitialHexPrefix(str) {
    return str.replace('0x', '');
  }

  removeTrailingZeros(str) {
    const strArray = str.split('');
    if (str[0] === '0') {
      const endElement = strArray.find((a) => a !== '0');
      const endElementIndex = strArray.indexOf(endElement);
      strArray.splice(0, endElementIndex).join('')
      return strArray.join('');
    } else if (str[0] !== '0' && str[str.length - 1] !== '0') {
      return `0x${str}`;
    } else {
      let firstZeroIndex = 0;
      let zeroFound = false;

      for (let i = 0; i < strArray.length; i++) {
        if (!zeroFound && strArray[i] === '0' && (strArray[i + 1] === '0' || strArray[i + 1] === undefined )) {
          firstZeroIndex = i;
          zeroFound = true;
        }
      }

      strArray.splice(firstZeroIndex, strArray.length);
      // hex values should have %2 equal to zero. If we removed the last zero, we have to add it back
      if (strArray.length % 2 !== 0) {
        strArray.push('0');
      }
      strArray.unshift('0x');
      return strArray.join('');
    }
  }

  public decodeArrayItem(item, output) {
    const copy = [...item];
    const hero = [];
    for (let i = 0; i < output.length; i++) {
      const outputItem = output[i];

      if (this.getDataType(outputItem.type) === 'simple') {
        hero[outputItem.name] = this.hexadecimalNumberToDecimal(copy.splice(0, 1)[0]);
        hero[i] = hero[outputItem.name];
      } else {
        const heroData = copy.splice(0, 1)[0];

        const dataLocationlength = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(heroData)) / 32;
        const dynamicTypeSizeInBytes = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(item[dataLocationlength]));
        const dataLocation = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(heroData)) / 32 + 1;

        if (dynamicTypeSizeInBytes <= 32) {
          hero[outputItem.name] = this.hex2ascii(this.removeTrailingZeros(item[dataLocation]));
          hero[i] = hero[outputItem.name];
        } else {
          const numberOfChunks = Math.ceil(dynamicTypeSizeInBytes / 32);
          hero[outputItem.name] = '';
          hero[i] = '';
          for (let j = 0;j < numberOfChunks; j++) {
            hero[outputItem.name] += this.hex2ascii(this.removeTrailingZeros(item[dataLocation + j]));
          }
          hero[i] += hero[outputItem.name];
        }

      }
    }
    return hero;
  }

  hex2ascii (hex) {
    if (!(typeof hex === 'number' || typeof hex == 'string')) {
      return '';
    }

    hex = hex.toString().replace(/\s+/gi, '')
    const stack = []

    for (var i = 0; i < hex.length; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16)
      if (!isNaN(code) && code !== 0) {
        stack.push(String.fromCharCode(code))
      }
    }

    return stack.join('');
  }


  public decode(hexData, abi) {
    console.log(hexData);
    const result = [];
    const cleanHexData = this.removeInitialHexPrefix(hexData);
    const chunksArray = this.splitBy32bytes(cleanHexData);
    console.log('chunksArray', chunksArray);
    if (abi[0].type.includes('[]')) {
      const arrayLengthLocationHex = chunksArray.splice(0, 1)[0];
      const arrayLengthnHex = chunksArray.splice(0, 1)[0];
      const arrayLengthLocation = this.hexadecimalNumberToDecimal(arrayLengthLocationHex);
      const arrayLength = this.hexadecimalNumberToDecimal(arrayLengthnHex);

      console.log(arrayLength);
      const arrayItemsHexLocations = chunksArray.splice(0, arrayLength);
      console.log('arrayItemsHexLocations', arrayItemsHexLocations);
      // get array items locations and convert them into indexes
      const arrayItemsLocation = arrayItemsHexLocations.map((hexItem) => {
        return this.hexadecimalNumberToDecimal(this.removeTrailingZeros(hexItem)) / 32 - arrayLength;
      });
      console.log('arrayItemsLocation', arrayItemsLocation);
      const hexHeroes = [];

      // splice the array onto heroes, according to the location data
      arrayItemsLocation.forEach((item, index) => {
        let hexHero;
        if (index + 1 !== arrayItemsLocation.length) {

          hexHero = chunksArray.slice(item, arrayItemsLocation[index + 1]);
        } else {
          hexHero = chunksArray.slice(item, chunksArray.length);
        }

        hexHeroes.push(hexHero);
      });

      console.log('hexHeroes', hexHeroes);

      hexHeroes.forEach((item) => {
        result.push(this.decodeArrayItem(item, abi[0].components));
      });
      /*
      = this.removeTrailingZeros(chunksArray.splice(0, 1));
      const arrayLengthLocation = this.hexadecimalNumberToDecimal(arrayLenthLocationHex) / 32;
      const arrayLength = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(chunksArray.splice(0, 1)));

       */
      return result;
    } else {
      const firstByteLocationHex = chunksArray.splice(0, 1)[0];
       result.push(this.decodeArrayItem(chunksArray, abi[0].components));
      return result[0];
    }
  }

}

//exports.AddressZero = '0x0000000000000000000000000000000000000000';
//exports.HashZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
