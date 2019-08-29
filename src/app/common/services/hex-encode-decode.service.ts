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
    // go through the types and decode data in hex array depending on a type
    for (let i = 0; i < output.length; i++) {
      const outputItem = output[i];
      // check the data type, if it a simple or dynamic (e.g. string or uint)
      if (this.getDataType(outputItem.type) === 'simple') {
        // if simple, e.g. uint - just decode
        hero[outputItem.name] = this.hexadecimalNumberToDecimal(copy.splice(0, 1)[0]);
        // to support old format (not possible to return structure) also assign to ussual array index
        hero[i] = hero[outputItem.name];
      } else {
        // get first data byte location in hex bytes
        const heroData = copy.splice(0, 1)[0];

        // get dynamic type location in hex bytes
        const dataLocationlength = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(heroData)) / 32;

        // get dynamic type size in hex bytes
        const dynamicTypeSizeInBytes = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(item[dataLocationlength]));

        // get dynamic type location like an array index (we are adding one as the element before is size data)
        const dataLocation = this.hexadecimalNumberToDecimal(this.removeTrailingZeros(heroData)) / 32 + 1;

        // data might be more then 32 bytes and goes split into several 32 bytes chunks. In this case we need to concatenate all the chunk into one.
        // just encode if size is smaller or equals to 32
        if (dynamicTypeSizeInBytes <= 32) {
          hero[outputItem.name] = this.hex2ascii(this.removeTrailingZeros(item[dataLocation]));
          hero[i] = hero[outputItem.name];
        } else {
          // concatenate if longer then 32. We nned to find shunks number, so we devide by 32 and ceil to the nearest bigger int.
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
    const result = [];
    // remove 0x from the hexadecimal string
    const cleanHexData = this.removeInitialHexPrefix(hexData);
    // split the data by 32 bytes chunks, thus 64 characters strings
    const chunksArray = this.splitBy32bytes(cleanHexData);

    // check datais an array
    if (abi[0].type.includes('[]')) {
      // get array length location in bytes, hexadecimal
      const arrayLengthLocationHex = chunksArray.splice(0, 1)[0];
      // get array length in bytes, hexadecimal
      const arrayLengthnHex = chunksArray.splice(0, 1)[0];
      // get array location in decimal bytes
      const arrayLengthLocation = this.hexadecimalNumberToDecimal(arrayLengthLocationHex);
      // get array length in decimal bytes
      const arrayLength = this.hexadecimalNumberToDecimal(arrayLengthnHex);

      // get array elements indexes in hex bytes
      const arrayItemsHexLocations = chunksArray.splice(0, arrayLength);

      // get array elements indexes in decimal bytes
      const arrayItemsLocation = arrayItemsHexLocations.map((hexItem) => {
        return this.hexadecimalNumberToDecimal(this.removeTrailingZeros(hexItem)) / 32 - arrayLength;
      });

      // prepare the array to hold hexadecimal array elements
      const hexHeroes = [];

      // splice array by indexes got before to get array items in hex
      arrayItemsLocation.forEach((item, index) => {
        let hexHero;
        if (index + 1 !== arrayItemsLocation.length) {

          hexHero = chunksArray.slice(item, arrayItemsLocation[index + 1]);
        } else {
          hexHero = chunksArray.slice(item, chunksArray.length);
        }

        hexHeroes.push(hexHero);
      });

      // go throught the hex array items and decode into decimal/ASCII
      hexHeroes.forEach((item) => {
        // pass to deco function the item => array of hex values and ABI types array
        result.push(this.decodeArrayItem(item, abi[0].components));
      });

      return result;
    } else {
      // if this is an tuple type aka object, remove first byte location in hex
      const firstByteLocationHex = chunksArray.splice(0, 1)[0];

      // decode the tuple and push to the result array
      result.push(this.decodeArrayItem(chunksArray, abi[0].components));
      return result[0];
    }
  }

}

//exports.AddressZero = '0x0000000000000000000000000000000000000000';
//exports.HashZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
