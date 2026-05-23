import { Component } from '@angular/core';
import { UiButtonComponent, UiCardComponent , UiSelectComponent, UiTableComponent} from 'ui-lib'; // ¡Añadimos UiCardComponent aquí!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent, UiSelectComponent, UiTableComponent], // Lo registramos en los imports del componente
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  // 3. Configuración de las columnas (Cómo se estructurará la tabla)
  columnasPersonajes = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre Completo' },
    { key: 'status', label: 'Estado Vital' },
    { key: 'species', label: 'Especie' }
  ];

  // 4. Datos quemados simulando la API de Rick y Morty
  listaPersonajes = [
    { id: '#001', name: 'Rick Sanchez', status: 'Vivo', species: 'Humano' },
    { id: '#002', name: 'Morty Smith', status: 'Vivo', species: 'Humano' },
    { id: '#003', name: 'Birdperson', status: 'Revivido', species: 'Alienígena' },
    { id: '#004', name: 'Squanchy', status: 'Desconocido', species: 'Alienígena' }
  ];
  
  alDarClick() {
    alert('¡Portal abierto! El botón de tu librería funciona a la perfección 🧪💚');
  }

  alDarClickHeader() {
    alert('¡Hiciste clic en el encabezado de la tarjeta! 📡');
  }
}