import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersPanelComponent } from './numbers-panel.component';

describe('NumbersPanelComponent', () => {
  let component: NumbersPanelComponent;
  let fixture: ComponentFixture<NumbersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
