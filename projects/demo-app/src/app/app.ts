import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { UiButtonComponent, UiCardComponent, UiSelectComponent, UiTableComponent, RickMortyService, Character } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent, UiSelectComponent, UiTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  // Inyectamos nuestro servicio de la librería
  private rickMortyService = inject(RickMortyService);

  // === CONFIGURACIÓN DE COLUMNAS PARA LA TABLA ===
  columnasPersonajes = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre Completo' },
    { key: 'status', label: 'Estado Vital' },
    { key: 'species', label: 'Especie' }
  ];

  // === ESTADOS REACTIVOS CON SIGNALS ===
  personajesRaw = signal<Character[]>([]); // Almacena los datos crudos de la API
  especieSeleccionada = signal<string>(''); // Almacena el filtro activo ('human', 'alien', etc.)
  estaCargando = signal<boolean>(true);    // Controla el esqueleto/aviso de carga

  // === SEÑAL DERIVADA (COMPUTED) ===
  personajesFiltrados = computed(() => {
    const todos = this.personajesRaw();
    const filtro = this.especieSeleccionada().toLowerCase();

    if (!filtro) {
      return todos;
    }

    return todos.filter(p => p.species.toLowerCase().includes(filtro));
  });

  // 👇 FIX ERROR 2: Cambiamos ': OnInit' por ': void' ya que ngOnInit no retorna nada
  ngOnInit(): void {
    // Al arrancar el laboratorio, disparamos la petición HTTP
    this.rickMortyService.getCharacters().subscribe({
      next: (data) => {
        this.personajesRaw.set(data);
        this.estaCargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando la base de datos galáctica:', err);
        this.estaCargando.set(false);
      }
    });
  }

  /**
   * Captura el evento del ui-select y actualiza la señal del filtro
   * 👇 FIX ERROR 1: Aceptamos 'string | null' y usamos '||' para que si es null, use un string vacío ''
   */
  alCambiarEspecie(valor: string | null) {
    this.especieSeleccionada.set(valor || '');
  }

  alDarClick() {
    alert('¡Portal abierto! El botón de tu librería funciona a la perfección 🧪💚');
  }

  alDarClickHeader() {
    alert('¡Hiciste clic en el encabezado de la tarjeta! 📡');
  }
}