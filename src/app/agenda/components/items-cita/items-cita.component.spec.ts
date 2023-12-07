import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCitaComponent } from './items-cita.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ItemsCitaComponent', () => {
  let component: ItemsCitaComponent;
  let fixture: ComponentFixture<ItemsCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsCitaComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ItemsCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
