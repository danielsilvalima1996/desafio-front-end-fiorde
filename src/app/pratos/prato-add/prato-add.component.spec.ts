import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoAddComponent } from './prato-add.component';

describe('PratoAddComponent', () => {
  let component: PratoAddComponent;
  let fixture: ComponentFixture<PratoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PratoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PratoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
