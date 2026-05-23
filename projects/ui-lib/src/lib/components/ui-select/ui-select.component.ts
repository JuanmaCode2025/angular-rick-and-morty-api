import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectOption } from '../../models/select.model'; // Importamos nuestra interfaz

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSelectComponent {
  // === INPUTS ===
  label = input<string>(''); 
  placeholder = input<string>('Seleccione una opción');
  options = input<SelectOption[]>([]); // Lista de opciones
  loading = input<boolean>(false);
  disabled = input<boolean>(false);

  // === MODEL (Sincronización de dos vías) ===
  // Este es el valor seleccionado. Se sincroniza con el padre automáticamente.
  value = model<string | null>(null);

  // === OUTPUTS ===
  selectionChange = output<SelectOption>(); // Emite el objeto completo al cambiar

  /** Función que se ejecuta cuando el usuario elige una opción */
  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    // Actualizamos nuestro modelo
    this.value.set(selectedValue);

    // Buscamos el objeto completo para avisar al padre
    const foundOption = this.options().find(opt => opt.value === selectedValue);
    if (foundOption) {
      this.selectionChange.emit(foundOption);
    }
  }
}