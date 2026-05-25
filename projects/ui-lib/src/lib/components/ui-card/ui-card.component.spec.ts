import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCardComponent } from './ui-card.component';

describe('UiCardComponent', () => {
  let component: UiCardComponent;
  let fixture: ComponentFixture<UiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Comprobar que se crea el componente
  it('should create the component', () => {
    fixture.componentRef.setInput('title', 'Rick Sanchez');
    fixture.detectChanges(); 

    expect(component).toBeTruthy();
  });

  // Test 2: Comprobar que el título se renderice en alguna parte del HTML
  it('should render the title in the HTML when provided', () => {
    // 1. Le pasamos un nombre de prueba al Input requerido
    fixture.componentRef.setInput('title', 'Rick Sanchez');
    
    // 2. Forzamos a Angular a procesar el HTML
    fixture.detectChanges(); 

    // 3. Obtenemos todo el texto plano que tiene el componente renderizado
    const compiled = fixture.nativeElement as HTMLElement;
    const textContent = compiled.textContent;

    // 4. Verificamos que el texto completo contenga el título que le inyectamos
    expect(textContent).toContain('Rick Sanchez');
  });
});