import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button', // La etiqueta HTML que usaremos en la app: <ui-button></ui-button>
  standalone: true,      // Componente moderno e independiente
  imports: [CommonModule], // Permite usar condiciones (*if) y bucles en el HTML
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Requisito: Máximo rendimiento
})
export class UiButtonComponent {
  
  // === INPUTS CON SIGNALS (Entradas de datos) ===
  
  /** El texto obligatorio que mostrará el botón */
  label = input.required<string>(); 

  /** Variantes visuales pedidas en la prueba. Por defecto es 'primary' */
  variant = input<'primary' | 'secondary' | 'danger'>('primary'); 

  /** Tamaños del botón. Por defecto es mediano ('md') */
  size = input<'sm' | 'md' | 'lg'>('md'); 

  /** Si está deshabilitado. Por defecto es falso */
  disabled = input<boolean>(false); 

  /** Si está cargando. Muestra un spinner y bloquea clics */
  loading = input<boolean>(false); 

  // === OUTPUTS CON SIGNALS (Eventos hacia afuera) ===
  
  /** Emite un evento al padre cuando se hace clic válido */
  clicked = output<void>();

  // === FUNCIONES ===
  
  /** Se ejecuta cuando el usuario hace clic en el botón */
  handleClick(): void {
    // REQUISITO EXPLICITO: "Emite solo si no está disabled ni loading"
    if (this.disabled() || this.loading()) {
      return; // Si está bloqueado o cargando, rompemos la función aquí y no hace nada
    }
    
    // Si está activo, avisamos al componente padre que se hizo clic
    this.clicked.emit();
  }
}