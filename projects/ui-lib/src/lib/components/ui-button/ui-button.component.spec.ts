import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonComponent } from './ui-button.component';

describe('UiButtonComponent', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UiButtonComponent);
    component = fixture.componentInstance;
    // No ejecutamos detectChanges aquí
  });

  it('should create', () => {
    // Pasamos el "label" requerido que está pidiendo Angular antes del renderizado
    fixture.componentRef.setInput('label', 'Click aquí');
    fixture.detectChanges(); 

    expect(component).toBeTruthy();
  });
});