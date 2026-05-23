import { Component, input, Output, EventEmitter } from '@angular/core'; // ◄--- Agregamos Output y EventEmitter aquí
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css'
})
export class UiTableComponent {
  // Tus inputs modernos basados en Signals (estos se quedan igual porque sí los reconoció)
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);
  loading = input<boolean>(false);

  // 👇 FIX DEFINITIVO: Usamos la declaración clásica con EventEmitter para asegurar compatibilidad
  @Output() actionTriggered = new EventEmitter<{ action: string; row: any }>();
}