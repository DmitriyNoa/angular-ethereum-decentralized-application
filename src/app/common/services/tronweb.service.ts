import { Injectable } from '@angular/core';
import TronWeb from 'tronweb';
declare let window;

@Injectable({
  providedIn: 'root'
})
export class TronwebService {

  public tronWeb: false;
  public contract: any;

  public TRONGRID_API = 'https://api.trongrid.io';

  async setContract(tronWeb, contractAddress) {
    this.contract = await tronWeb.contract().at(contractAddress);
  }

  setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
  }

  constructor() {
    if (window.tronWeb !== undefined) {
      this.setTronWeb(window.tronWeb);
    } else {
      this.tronWeb = new TronWeb(
        this.TRONGRID_API,
        this.TRONGRID_API,
        this.TRONGRID_API
      );
    }
  }
}
