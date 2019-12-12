import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainChooserComponent } from './blockchain-chooser.component';

describe('BlockchainChooserComponent', () => {
  let component: BlockchainChooserComponent;
  let fixture: ComponentFixture<BlockchainChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
