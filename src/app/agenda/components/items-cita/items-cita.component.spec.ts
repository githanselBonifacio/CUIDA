import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCitaComponent } from './items-cita.component';

describe('ItemsCitaComponent', () => {
  let component: ItemsCitaComponent;
  let fixture: ComponentFixture<ItemsCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsCitaComponent]
    });
    fixture = TestBed.createComponent(ItemsCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
