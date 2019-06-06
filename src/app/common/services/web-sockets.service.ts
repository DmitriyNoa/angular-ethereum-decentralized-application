import { Injectable, EventEmitter } from '@angular/core';
import {environment} from '../../../environments/environment';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private socket;
  private ABI = environment.ABI;
  private events = [];
  public socketOpened: EventEmitter<boolean> = new EventEmitter();

  constructor() {

    this.socket = new WebSocket(environment.RPCWSSProvider);

    this.socket.addEventListener('open', (event) => {
      this.socketOpened.next(true);
    });
  }

  subscribe(ABIEventName: any) {
    const functionABI = this.ABI.abi.find((abiItem) => abiItem.name === ABIEventName);
    let contractAddress;
    for (const key in this.ABI.networks) {
      if (!contractAddress && this.ABI.networks[key]) {
        contractAddress = this.ABI.networks[key].address;
      }
    }
    this.events.push(functionABI);
    const request = {
      id: 3,
      method: 'eth_subscribe',
      params: ['logs', {
        topics: [functionABI.signature],
        address: contractAddress
      }]
    };
    this.socket.send(JSON.stringify(request));
  }

  listen(callBack) {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.params && data.params.result) {
        const web3 = new Web3();
        const eventABI = this.events.find((item: any) => {
          return item.signature === data.params.result.topics[0];
        });
        const decoded = web3.eth.abi.decodeLog(eventABI.inputs, data.params.result.data, data.params.result.topics);
        callBack(decoded);
      }
    };
  }

}
