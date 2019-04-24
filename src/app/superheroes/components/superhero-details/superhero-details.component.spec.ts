import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroDetailsComponent } from './superhero-details.component';

describe('SuperheroDetailsComponent', () => {
  let component: SuperheroDetailsComponent;
  let fixture: ComponentFixture<SuperheroDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperheroDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
