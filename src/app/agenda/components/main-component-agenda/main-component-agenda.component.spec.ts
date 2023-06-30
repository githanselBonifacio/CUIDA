import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponentAgendaComponent } from './main-component-agenda.component';

describe('MainComponentAgendaComponent', () => {
  let component: MainComponentAgendaComponent;
  let fixture: ComponentFixture<MainComponentAgendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponentAgendaComponent]
    });
    fixture = TestBed.createComponent(MainComponentAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
