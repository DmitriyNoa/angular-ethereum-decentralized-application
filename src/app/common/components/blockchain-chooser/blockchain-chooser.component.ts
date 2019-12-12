import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-blockchain-chooser',
  templateUrl: './blockchain-chooser.component.html',
  styleUrls: ['./blockchain-chooser.component.css']
})
export class BlockchainChooserComponent implements OnInit {

  public blockchainProviders = ['ethereum', 'tron', 'eos'];

  @Input()
  public currentProvider: string;

  @Output()
  public onBlockhainProviderChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public handleBlockchainChange(event) {
    this.currentProvider = event.value;
    this.onBlockhainProviderChange.emit(event.value);
  }

  ngOnInit() {
  }

}
