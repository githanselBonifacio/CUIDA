import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMovilesPageComponent } from './main-moviles-page.component';

describe('MainMovilesPageComponent', () => {
  let component: MainMovilesPageComponent;
  let fixture: ComponentFixture<MainMovilesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMovilesPageComponent]
    });
    fixture = TestBed.createComponent(MainMovilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
