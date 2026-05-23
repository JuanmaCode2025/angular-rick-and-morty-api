import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interfaz para definir la estructura de cada columna.
 * 'key' representa la propiedad del objeto (ej: 'status') 
 * y 'label' es el título visible (ej: 'Estado').
 */
export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTableComponent {
  
  // === INPUTS CON SIGNALS (Obligatorios para recibir datos externos) ===

  /** Configuración de las columnas que va a renderizar la tabla */
  columns = input.required<TableColumn[]>();

  /** Array genérico con los objetos/datos puros que se van a listar */
  data = input.required<any[]>();

  /** Estado de carga visual */
  loading = input<boolean>(false);
}