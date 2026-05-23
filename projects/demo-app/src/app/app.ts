import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  UiButtonComponent, 
  UiCardComponent, 
  UiSelectComponent, 
  UiTableComponent, 
  RickMortyService, 
  Character 
} from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UiButtonComponent, UiCardComponent, UiSelectComponent, UiTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private rickMortyService = inject(RickMortyService);

  // === CONFIGURACIÓN DE COLUMNAS ===
  columnasPersonajes = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'status', label: 'Estado Vital' },
    { key: 'species', label: 'Especie' },
    { key: 'actions', label: 'Acciones' } // Nueva columna para Ver Detalle / Eliminar
  ];

  // === ESTADOS CENTRALIZADOS CON SIGNALS ===
  recursoActivo = signal<string>('characters'); // Preseleccionado 'characters'
  filtroEspecie = signal<string>('');           // Filtro por especie
  filtroStatus = signal<string>('');            // Filtro por estatus (Alive, Dead, etc.)
  
  personajesRaw = signal<Character[]>([]);      // Datos puros de la API
  estaCargando = signal<boolean>(true);         // Estado de carga (Skeleton)
  errorMensaje = signal<string | null>(null);   // Estado de error

  personajeSeleccionado = signal<Character | null>(null); // Controla el Modal de Detalle
  mostrarModal = signal<boolean>(false);

  // === SEÑAL COMPUTADA: FILTRADO EN TIEMPO REAL (UI SIDE) ===
  personajesFiltrados = computed(() => {
    let todos = this.personajesRaw();
    
    // Filtro por Especie (Local)
    if (this.filtroEspecie()) {
      const esp = this.filtroEspecie().toLowerCase();
      todos = todos.filter(p => p.species.toLowerCase().includes(esp));
    }

    return todos;
  });

  ngOnInit(): void {
    // Carga inicial automatica
    this.cargarDatosDeAPI();
  }

  /**
   * Realiza la petición HTTP aplicando los filtros correspondientes
   */
  cargarDatosDeAPI() {
    this.estaCargando.set(true);
    this.errorMensaje.set(null);

    // Pasamos el filtro de status a la API si existe
    this.rickMortyService.getCharacters(this.filtroStatus()).subscribe({
      next: (data) => {
        this.personajesRaw.set(data);
        this.estaCargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMensaje.set('¡Fallo en el escáner interdimensional! No se pudieron recuperar los registros.');
        this.estaCargando.set(false);
      }
    });
  }

  /**
   * Al cambiar el recurso (Characters, Locations, Episodes)
   */
  alCambiarRecurso(recurso: string | null) {
    if (!recurso) return;
    this.recursoActivo.set(recurso);
    
    // Regla: Al cambiar el recurso, los filtros se resetean
    this.filtroEspecie.set('');
    this.filtroStatus.set('');
    
    if (recurso === 'characters') {
      this.cargarDatosDeAPI();
    } else {
      // Simulación de estados vacíos para otros recursos no implementados en el examen
      this.personajesRaw.set([]);
    }
  }

  /**
   * Al cambiar el filtro de Estatus (Dispara nueva petición HTTP)
   */
  alCambiarStatus(status: string | null) {
    this.filtroStatus.set(status || '');
    // Regla: Al cambiar el filtro de status, se hace una nueva petición con el parámetro aplicado
    if (this.recursoActivo() === 'characters') {
      this.cargarDatosDeAPI();
    }
  }

  alCambiarEspecie(especie: string | null) {
    this.filtroEspecie.set(especie || '');
  }

  /**
   * Captura las acciones disparadas por los botones de la tabla
   */
/**
   * Captura las acciones disparadas por los botones de la tabla
   * 👇 FIX: Cambiamos el tipo estricto a 'any' para que Angular HTML no choque con los tipos globales
   */
  alEjecutarAccion(evento: any) {
    if (!evento) return;
    
    if (evento.action === 'view') {
      this.personajeSeleccionado.set(evento.row);
      this.mostrarModal.set(true);
    } else if (evento.action === 'delete') {
      const confirmar = confirm(`¿Estás seguro de que deseas desintegrar a ${evento.row.name} de la existencia?`);
      if (confirmar) {
        // El output actionTriggered emite { action: 'delete', row } correctamente.
        this.personajesRaw.set(this.personajesRaw().filter(p => p.id !== evento.row.id));
      }
    }
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    this.personajeSeleccionado.set(null);
  }
}