import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGamePage } from './play-game.page';

describe('PlayGamePage', () => {
  let component: PlayGamePage;
  let fixture: ComponentFixture<PlayGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
