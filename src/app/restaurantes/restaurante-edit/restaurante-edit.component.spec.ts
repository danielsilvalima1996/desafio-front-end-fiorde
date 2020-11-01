import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteEditComponent } from './restaurante-edit.component';

describe('RestauranteEditComponent', () => {
  let component: RestauranteEditComponent;
  let fixture: ComponentFixture<RestauranteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauranteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
