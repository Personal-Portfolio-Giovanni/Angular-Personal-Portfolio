import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlipElegantComponent } from './card-flip-elegant.component';

describe('CardFlipElegantComponent', () => {
  let component: CardFlipElegantComponent;
  let fixture: ComponentFixture<CardFlipElegantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFlipElegantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlipElegantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
