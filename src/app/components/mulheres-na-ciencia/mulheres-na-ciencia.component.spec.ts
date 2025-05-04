import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulheresNaCienciaComponent } from './mulheres-na-ciencia.component';

describe('MulheresNaCienciaComponent', () => {
  let component: MulheresNaCienciaComponent;
  let fixture: ComponentFixture<MulheresNaCienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulheresNaCienciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulheresNaCienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
