import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card', // Etiqueta personalizada: <ui-card></ui-card>
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Rendimiento OnPush obligatorio
})
export class UiCardComponent {
  
  // === INPUTS CON SIGNALS ===
  
  /** Título principal que se mostrará en la cabecera */
  title = input.required<string>();

  /** Subtítulo opcional. Puede recibir un string o ser null */
  subtitle = input<string | null>(null);

  /** Estilo visual de elevación/bordes de la tarjeta */
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');

  // === OUTPUTS CON SIGNALS ===
  
  /** Emite un evento hacia el padre cuando se hace clic en la cabecera */
  headerClicked = output<void>();

  // === MÉTODOS ===
  
  /** Se ejecuta al hacer clic en el Header */
  onHeaderClick(): void {
    this.headerClicked.emit();
  }
}